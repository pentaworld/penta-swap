import { currentChainNameSelector } from "@/states/web3";
import { isEqCurrencies } from "@/utils/isEqCurrencies";
import { wrapCurrency } from "@/utils/wrapCurrency";
import { DefaultValue, noWait, selector } from "recoil";
import { tradeExactInSelector, tradeExactOutSelector } from "../trade";
import {
  inputCurrencyState,
  inputValueState,
  nowTypingValueState,
  outputCurrencyState,
  outputValueState,
} from "./atoms";

export const inputCurrencySelector = selector({
  key: "inputCurrencySelector",
  get: ({ get }) => get(inputCurrencyState),
  set: ({ set, get, reset }, newCurrency) => {
    const oldInputCurrency = get(inputCurrencyState);
    const outputCurrency = get(outputCurrencyState);
    if (newCurrency instanceof DefaultValue) {
      reset(inputCurrencyState);
    } else if (isEqCurrencies(outputCurrency, newCurrency)) {
      set(outputCurrencyState, oldInputCurrency);
      set(inputCurrencyState, newCurrency);
    } else {
      set(inputCurrencyState, newCurrency);
    }
  },
});

export const outputCurrencySelector = selector({
  key: "outputCurrencySelector",
  get: ({ get }) => get(outputCurrencyState),
  set: ({ set, get, reset }, newCurrency) => {
    const oldOutputCurrency = get(outputCurrencyState);
    const inputCurrency = get(inputCurrencyState);
    if (newCurrency instanceof DefaultValue) {
      reset(inputCurrencyState);
    } else if (isEqCurrencies(inputCurrency, newCurrency)) {
      set(inputCurrencyState, oldOutputCurrency);
      set(outputCurrencyState, newCurrency);
    } else {
      set(outputCurrencyState, newCurrency);
    }
  },
});

export const selectTokensSelector = selector({
  key: "selectTokens",
  get: ({ get }) => {
    const chainName = get(currentChainNameSelector);
    const inputToken = wrapCurrency(get(inputCurrencySelector), chainName);
    const outputToken = wrapCurrency(get(outputCurrencySelector), chainName);
    return { inputToken, outputToken };
  },
});

export const inputValueSelector = selector({
  key: "inputValueSelector",
  get: ({ get }) => {
    const nowTyping = get(nowTypingValueState);
    if (nowTyping === "input") {
      return get(inputValueState);
    } else {
      const tradeLoadable = get(noWait(tradeExactOutSelector));
      const [trade] = tradeLoadable.valueMaybe() || [];
      return trade ? trade.inputAmount.toSignificant(12) : "";
    }
  },
  set: ({ set }, newValue) => {
    set(inputValueState, newValue);
    set(nowTypingValueState, "input");
  },
});

export const outputValueSelector = selector({
  key: "outputValueSelector",
  get: ({ get }) => {
    const nowTyping = get(nowTypingValueState);
    if (nowTyping === "output") {
      return get(outputValueState);
    } else {
      const tradeLoadable = get(noWait(tradeExactInSelector));
      const [trade] = tradeLoadable.valueMaybe() || [];
      return trade ? trade.outputAmount.toSignificant(12) : "";
    }
  },
  set: ({ set }, newValue) => {
    set(outputValueState, newValue);
    set(nowTypingValueState, "output");
  },
});
