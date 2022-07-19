import { ChevronDownIcon } from "@heroicons/react/outline";
import { Currency, Token } from "@penta-swap/sdk";
import clsx from "clsx";
import { CurrencyLogo } from "./CurrencyLogo";

export const CurrencySelectButton: React.FC<
  JSX.IntrinsicElements["button"] & {
    currency: Token | Currency | null;
  }
> = ({ currency, className, ...props }) => {
  if (currency) {
    return (
      <button
        className={clsx(
          "btn btn-ghost justify-start gap-1 p-0 text-xl font-bold sm:px-2",
          className
        )}
        {...props}
      >
        <CurrencyLogo currency={currency} />
        {currency.symbol}
        <ChevronDownIcon className="h-6 w-6" />
      </button>
    );
  } else {
    return (
      <button
        className={clsx(
          "btn btn-ghost justify-start text-xl font-bold sm:px-2",
          className
        )}
        {...props}
      >
        Select Token
      </button>
    );
  }
};
