import { getCurrencyAddress } from "@/utils/getCurrencyAddress";
import { Currency, Token } from "@penta-swap/sdk";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { currencyLogoStates } from "./atoms";
import {
  currentChainCurrenciesSelector,
  nativeLogoSelector,
} from "./selectors";

export const useCurrencyLogo = (currency: Currency | Token) => {
  const address = useMemo(() => getCurrencyAddress(currency), [currency]);
  const logo = useRecoilValue(currencyLogoStates(address));
  const nativeLogo = useRecoilValue(nativeLogoSelector);
  return address ? logo : nativeLogo;
};

export const useSortedCurrencies = (query: string) => {
  const currencies = useRecoilValue(currentChainCurrenciesSelector);
  const sortedCurrencies = useMemo(
    () =>
      currencies.filter((currency) =>
        currency.name?.toLowerCase().includes(query.toLowerCase())
      ),
    [currencies, query]
  );
  return sortedCurrencies;
};
