import { getTokenAmount } from "@/utils/getTokenAmount";
import { Trade } from "@penta-swap/sdk";
import { selector } from "recoil";
import {
  inputValueState,
  nowTypingValueState,
  outputValueState,
  selectTokensSelector,
} from "../input";
import { tokenPairsQuery } from "../pair/selector";

export const tradeExactInSelector = selector({
  key: "tradeExactIn",
  get: ({ get }) => {
    const inputValue = get(inputValueState);
    const { inputToken, outputToken } = get(selectTokensSelector);
    const [, pairs] = get(tokenPairsQuery);

    if (!(inputToken && outputToken)) return null;

    const tokenAmount = getTokenAmount(inputToken, inputValue);
    return Trade.bestTradeExactIn(pairs, tokenAmount, outputToken, {
      maxNumResults: 3,
      maxHops: 3,
    });
  },
});

export const tradeExactOutSelector = selector({
  key: "tradeExactOut",
  get: ({ get }) => {
    const outputValue = get(outputValueState);
    const { inputToken, outputToken } = get(selectTokensSelector);
    const [, pairs] = get(tokenPairsQuery);

    if (!(inputToken && outputToken)) return null;

    const tokenAmount = getTokenAmount(outputToken, outputValue);
    return Trade.bestTradeExactOut(pairs, inputToken, tokenAmount, {
      maxNumResults: 3,
      maxHops: 3,
    });
  },
});

export const tradesSelector = selector({
  key: "trades",
  get: ({ get }) => {
    const nowTyping = get(nowTypingValueState);
    const trades =
      nowTyping === "input"
        ? get(tradeExactInSelector)
        : get(tradeExactOutSelector);

    return trades;
  },
});
