import { Currency, Token } from "@penta-swap/sdk";

export const isEqCurrencies = (
  currency1: Currency | Token | null,
  currency2: Currency | Token | null
) => {
  return (
    currency1 === currency2 ||
    (currency1 instanceof Token &&
      currency2 instanceof Token &&
      currency1.address === currency2.address)
  );
};
