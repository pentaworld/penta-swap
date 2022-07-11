import { useSortedCurrencies } from "@/states/currency";
import { XIcon } from "@heroicons/react/solid";
import { Currency } from "@penta-swap/sdk";
import { useState } from "react";
import { CurrencyLogo } from "../Currency";
import { Modal, ModalProps } from "../Elements";

export const CurrencyRow: React.FC<{ currency: Currency }> = ({ currency }) => {
  return (
    <div className=" flex-row shrink-0 gap-2 items-center p-2 transition-all active:scale-95 cursor-pointer card hover:bg-base-300">
      <CurrencyLogo currency={currency} />
      <div className="text-lg font-bold">{currency.symbol}</div>
    </div>
  );
};

export const CurrencySelectModal: React.FC<ModalProps> = (props) => {
  const [query, setQuery] = useState("");
  const currencies = useSortedCurrencies(query);
  return (
    <Modal className="flex flex-col gap-2 p-4 sm:p-6" {...props}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Select Token</h3>
        <button
          className="btn btn-ghost btn-square btn-sm"
          onClick={props.onClose}
        >
          <XIcon />
        </button>
      </div>
      <input
        type="text"
        placeholder="Search Name"
        className="w-full text-xl font-bold input bg-base-200"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex overflow-y-auto flex-col max-h-[60vh]">
        {currencies.map((currency, i) => (
          <CurrencyRow currency={currency} key={i} />
        ))}
      </div>
    </Modal>
  );
};
