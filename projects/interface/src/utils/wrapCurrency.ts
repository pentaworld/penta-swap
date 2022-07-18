import { chains } from "@/constant/chains";
import { WETH } from "@/constant/tokens";
import { Currency, Token } from "@penta-swap/sdk";

export const wrapCurrency = (
  currency: Currency | Token | null,
  chainName: chains
): Token | null => {
  if (currency instanceof Token) {
    return currency;
  } else if (currency === Currency.ETHER) {
    return WETH[chainName];
  } else {
    return null;
  }
};
