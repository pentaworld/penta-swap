import { CurrencyInput } from "@/components/Currency";
import { useWeb3 } from "@/hooks";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { fetchTokenPairs } from "../api/fetchPairs";
import { useSelectCurrencies } from "../state";
import { relationalPairsSelector } from "../state/trade/selector";

export const Swap = () => {
  const { inputCurrency, setInputCurrency, outputCurrency, setOutputCurrency } =
    useSelectCurrencies();
  const pairs = useRecoilValue(relationalPairsSelector);
  const { fetchProvider, currentChainName } = useWeb3();
  useEffect(() => {
    fetchTokenPairs(pairs, currentChainName, fetchProvider).then(console.log);
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
