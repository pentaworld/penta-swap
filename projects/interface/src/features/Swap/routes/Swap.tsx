import { CurrencyInput } from "@/components/Currency";
import { useCurrencyValues, useSelectCurrencies } from "../state";

export const Swap = () => {
  const { inputCurrency, setInputCurrency, outputCurrency, setOutputCurrency } =
    useSelectCurrencies();
  const { inputValue, setInputValue, outputValue, setOutputValue } =
    useCurrencyValues();
  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="text-2xl font-bold text-center">Swap</div>
      <CurrencyInput
        label="Input"
        currency={inputCurrency}
        onSelect={setInputCurrency}
        value={inputValue}
        onChange={setInputValue}
      />
      <CurrencyInput
        label="Output"
        currency={outputCurrency}
        onSelect={setOutputCurrency}
        value={outputValue}
        onChange={setOutputValue}
      />
    </div>
  );
};
