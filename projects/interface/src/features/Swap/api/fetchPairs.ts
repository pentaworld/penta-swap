import { chains } from "@/constant/chains";
import { MULTI_CALL } from "@/constant/multicall";
import { UniswapV2Pair__factory } from "@/libs/contracts";
import { Multicall__factory } from "@/libs/contracts/factories";
import { Pair, Token, TokenAmount } from "@penta-swap/sdk";
import { BigNumber, ethers } from "ethers";

export const fetchTokenPairs = async (
  pairTokens: [Token, Token][],
  chainName: chains,
  provider: ethers.providers.Provider
) => {
  const pairInterface = UniswapV2Pair__factory.createInterface();
  const multiCall = Multicall__factory.connect(MULTI_CALL[chainName], provider);
  const pairAddresses = pairTokens.map(([tokenA, tokenB]) =>
    Pair.getAddress(tokenA, tokenB)
  );
  const callData = pairInterface.encodeFunctionData("getReserves");

  const calls = pairAddresses.map((address) => ({
    target: address,
    callData,
  }));

  const [blockNumber, results] = await multiCall.callStatic.aggregate(calls);
  const pairs = results
    .map((result, i) => {
      if (result === "0x") {
        return;
      } else {
        const [tokenA, tokenB] = pairTokens[i];
        const [reserves0, reserves1] = pairInterface.decodeFunctionResult(
          "getReserves",
          result
        ) as [BigNumber, BigNumber];
        const balances = (
          tokenA.sortsBefore(tokenB)
            ? [reserves0, reserves1]
            : [reserves1, reserves0]
        ) as [BigNumber, BigNumber];
        return new Pair(
          new TokenAmount(tokenA, balances[0].toString()),
          new TokenAmount(tokenB, balances[1].toString())
        );
      }
    })
    .filter((pair) => Boolean(pair));
  return [blockNumber, pairs];
};
