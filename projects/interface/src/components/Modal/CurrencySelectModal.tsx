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
            "card shrink-0 cursor-pointer flex-row items-center gap-2 p-2 transition-all active:scale-95",
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
      <div className="flex items-center justify-between">
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
          className="input w-full bg-base-200 text-xl font-bold"
          displayValue={(currency: unknown) =>
            (currency instanceof Currency && currency.symbol) || ""
          }
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="h-[60vh] overflow-y-auto">
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
