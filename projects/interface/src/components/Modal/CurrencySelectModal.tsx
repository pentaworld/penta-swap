import { useSortedCurrencies } from "@/states/currency";
import { Combobox } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { Currency, Token } from "@penta-swap/sdk";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { CurrencyLogo } from "../Currency";
import { Modal, ModalProps } from "../Elements";

export const CurrencyRow: React.FC<{ currency: Currency | Token }> = ({
  currency,
}) => {
  return (
    <Combobox.Option as={Fragment} value={currency}>
      {({ active }) => (
        <li
          className={clsx(
            "flex-row shrink-0 gap-2 items-center p-2 transition-all active:scale-95 cursor-pointer card",
            active && "bg-base-300"
          )}
        >
          <CurrencyLogo currency={currency} />
          <div className="text-lg font-bold">{currency.symbol}</div>
        </li>
      )}
    </Combobox.Option>
  );
};

export const CurrencySelectModal: React.FC<
  ModalProps & {
    currency: Currency | Token | null;
    onSelect: (currency: Currency | Token | null) => void;
  }
> = ({ currency, onSelect, ...props }) => {
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
      <Combobox
        value={currency}
        onChange={(currency) => (onSelect(currency), props.onClose())}
      >
        <Combobox.Input
          type="text"
          placeholder="Search Name"
          className="w-full text-xl font-bold input bg-base-200"
          displayValue={(currency: unknown) =>
            (currency instanceof Currency && currency.symbol) || ""
          }
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="overflow-y-auto h-[60vh]">
          <Combobox.Options className="flex flex-col" static>
            {currencies.map((currency, i) => (
              <CurrencyRow currency={currency} key={i} />
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </Modal>
  );
};
