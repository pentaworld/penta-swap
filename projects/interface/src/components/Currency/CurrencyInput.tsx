import { NumberInput } from "@/components/Elements";
import { useModal } from "@/states/interface";
import { Currency, Token } from "@penta-swap/sdk";
import { memo } from "react";
import { CurrencySelectModal } from "../Modal";
import { CurrencySelectButton } from "./CurrencySelectButton";

// eslint-disable-next-line react/display-name
export const CurrencyInput: React.FC<{
  currency: Currency | Token | null;
  onSelect: (currency: Currency | Token | null) => void;
  label: string;
}> =
  // eslint-disable-next-line react/display-name
  memo(({ currency, onSelect, label }) => {
    const { isOpen, open, close } = useModal(`select-${label}`);
    return (
      <>
        <CurrencySelectModal
          open={isOpen}
          onClose={close}
          currency={currency}
          onSelect={onSelect}
        />
        <div className="p-3 hover:ring-2 shadow-lg ring-neutral card bg-base-100">
          <div className="flex justify-between">
            <p className="text-lg font-bold">{label}</p>
          </div>
          <div className="flex flex-col gap-1 justify-between sm:flex-row sm:items-center">
            <CurrencySelectButton currency={currency} onClick={open} />
            <div className="-m-1 divider sm:divider-horizontal"></div>
            <NumberInput className="pl-2 w-full text-3xl font-bold bg-transparent outline-none sm:pl-0 input" />
          </div>
        </div>
      </>
    );
  });
