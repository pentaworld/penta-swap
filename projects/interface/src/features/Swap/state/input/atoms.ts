import { Currency, Token } from "@penta-swap/sdk";
import { atom } from "recoil";

export const inputCurrencyState = atom<Currency | Token | null>({
  key: "inputCurrency",
  default: Currency.ETHER,
});

export const outputCurrencyState = atom<Currency | Token | null>({
  key: "outputCurrency",
  default: null,
});

export const inputValueState = atom<string>({
  key: "inputValueState",
  default: "",
});

export const outputValueState = atom<string>({
  key: "outputValueState",
  default: "",
});
