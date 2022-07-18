import { chainTokens } from "@/constant/tokens";
import { currentChainNameSelector } from "@/states/web3";
import { isEqCurrencies } from "@/utils/isEqCurrencies";
import { wrapCurrency } from "@/utils/wrapCurrency";
import { Token } from "@penta-swap/sdk";
import { selector } from "recoil";
import { inputCurrencyState, outputCurrencyState } from "../input/atoms";

export const basePairsSelector = selector({
  key: "basePairs",
  get: ({ get }) => {
    const chainName = get(currentChainNameSelector);
    const commons = chainTokens[chainName];
    const basePairs = commons
      .map((tokenA) => commons.map((tokenB) => [tokenA, tokenB]))
      .flat() as [Token, Token][];
    return basePairs;
  },
});

export const relationalPairsSelector = selector({
  key: "relationalPairs",
  get: ({ get }) => {
    const chainName = get(currentChainNameSelector);
    const inputToken = wrapCurrency(get(inputCurrencyState), chainName);
    const outputToken = wrapCurrency(get(outputCurrencyState), chainName);
    const basePairs = get(basePairsSelector);
    const commons = chainTokens[chainName];

    const allTokenCombinations =
      inputToken && outputToken
        ? [
            [inputToken, outputToken],
            ...commons.map((token) => [inputToken, token]),
            ...commons.map((token) => [outputToken, token]),
            ...basePairs,
          ]
            .filter((tokens): tokens is [Token, Token] =>
              Boolean(tokens[0] && tokens[1])
            )
            .filter(([tokenA, tokenB]) => !isEqCurrencies(tokenA, tokenB))
        : [];
    return allTokenCombinations;
  },
});
