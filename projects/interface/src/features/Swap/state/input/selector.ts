import { currentChainNameSelector } from "@/states/web3";
import { isEqCurrencies } from "@/utils/isEqCurrencies";
import { wrapCurrency } from "@/utils/wrapCurrency";
import { DefaultValue, selector } from "recoil";
import { inputCurrencyState, outputCurrencyState } from "./atoms";

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
