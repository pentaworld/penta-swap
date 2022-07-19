import { NumberInput } from "@/components/Elements";
import { useModal } from "@/states/interface";
import { Currency, Token } from "@penta-swap/sdk";
import { memo } from "react";
import { CurrencySelectModal } from "../Modal";
import { CurrencySelectButton } from "./CurrencySelectButton";

// eslint-disable-next-line react/display-name
export const CurrencyInput: React.FC<{
  label: string;
  currency: Currency | Token | null;
  onSelect: (currency: Currency | Token | null) => void;
  value: string;
  onChange: (value: string) => void;
}> =
  // eslint-disable-next-line react/display-name
  memo(({ currency, onSelect, value, onChange, label }) => {
    const { isOpen, open, close } = useModal(`select-${label}`);
    return (
      <>
        <CurrencySelectModal
          open={isOpen}
          onClose={close}
          currency={currency}
          onSelect={onSelect}
        />
        <div className="card bg-base-100 p-3 shadow-lg ring-neutral hover:ring-2">
          <div className="flex justify-between">
            <p className="text-lg font-bold">{label}</p>
          </div>
          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
            <CurrencySelectButton currency={currency} onClick={open} />
            <div className="divider -m-1 sm:divider-horizontal"></div>
            <NumberInput
              className="input w-full bg-transparent pl-2 text-3xl font-bold outline-none sm:pl-0"
              value={value}
              onChange={onChange}
            />
          </div>
        </div>
      </>
    );
  });
