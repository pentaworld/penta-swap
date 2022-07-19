import { useRecoilState } from "recoil";
import {
  inputCurrencySelector,
  inputValueSelector,
  outputCurrencySelector,
  outputValueSelector,
} from "./selector";

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

export const useCurrencyValues = () => {
  const [inputValue, setInputValue] = useRecoilState(inputValueSelector);
  const [outputValue, setOutputValue] = useRecoilState(outputValueSelector);

  return { inputValue, setInputValue, outputValue, setOutputValue };
};
