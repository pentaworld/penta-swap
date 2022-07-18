import { chains } from "@/constant/chains";
import { MULTI_CALL } from "@/constant/multicall";
import { UniswapV2Pair__factory } from "@/libs/contracts";
import { Multicall__factory } from "@/libs/contracts/factories";
import { Pair, Token } from "@penta-swap/sdk";
import { ethers } from "ethers";

export const fetchTokenPairs = async (
  pairs: [Token, Token][],
  chainName: chains,
  provider: ethers.providers.Provider
) => {
  const pairInterface = UniswapV2Pair__factory.createInterface();
  const multiCall = Multicall__factory.connect(MULTI_CALL[chainName], provider);
  const pairAddresses = pairs.map(([tokenA, tokenB]) =>
    Pair.getAddress(tokenA, tokenB)
  );
  const callData = pairInterface.encodeFunctionData("getReserves");

  const calls = pairAddresses.map((address) => ({
    target: address,
    callData,
  }));

  const [blockNumber, results] = await multiCall.callStatic.aggregate(calls);
  console.log(blockNumber);
  console.log(results);
};
