import { selector } from "recoil";
import { currentChainNameSelector } from "../web3";
import { currenciesStates, nativeLogoStates } from "./atoms";

export const nativeLogoSelector = selector({
  key: "nativeLogoSelector",
  get({ get }) {
    const chainName = get(currentChainNameSelector);
    const nativeLogo = get(nativeLogoStates(chainName));
    return nativeLogo;
  },
});

export const currentChainCurrenciesSelector = selector({
  key: "currentChainCurrencies",
  get({ get }) {
    const chainName = get(currentChainNameSelector);
    const currencies = get(currenciesStates(chainName));
    return currencies;
  },
});
