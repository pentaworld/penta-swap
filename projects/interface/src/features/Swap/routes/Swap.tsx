import { CurrencyInput } from "@/components/Currency";
import { useSelectCurrencies } from "../state";

export const Swap = () => {
  const { inputCurrency, setInputCurrency, outputCurrency, setOutputCurrency } =
    useSelectCurrencies();
  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="text-2xl font-bold text-center">Swap</div>
      <CurrencyInput
        label="Input"
        currency={inputCurrency}
        onSelect={setInputCurrency}
      />
      <CurrencyInput
        label="Output"
        currency={outputCurrency}
        onSelect={setOutputCurrency}
      />
    </div>
  );
};
