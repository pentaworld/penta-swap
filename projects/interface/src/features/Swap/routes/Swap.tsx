import { CurrencyInput } from "@/components/Currency";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useSelectCurrencies } from "../state";
import { tokenPairsQuery } from "../state/pair/selector";

export const Swap = () => {
  const { inputCurrency, setInputCurrency, outputCurrency, setOutputCurrency } =
    useSelectCurrencies();
  const pairs = useRecoilValue(tokenPairsQuery);
  useEffect(() => {
    console.log(pairs);
  }, [pairs]);
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
