import { useRecoilState } from "recoil";
import { inputCurrencySelector, outputCurrencySelector } from "./selector";

export const useSelectCurrencies = () => {
  const [inputCurrency, setInputCurrency] = useRecoilState(
    inputCurrencySelector
  );
  const [outputCurrency, setOutputCurrency] = useRecoilState(
    outputCurrencySelector
  );

  return {
    inputCurrency,
    setInputCurrency,
    outputCurrency,
    setOutputCurrency,
  };
};
