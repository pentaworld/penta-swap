import { useCurrentChain } from "@/hooks";
import { useWeb3 } from "@inaridiy/useful-web3";
import React from "react";

export const SwitchNetwork: React.VFC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  const { switchChain } = useWeb3();
  const { param } = useCurrentChain();
  return (
    <button className={className} onClick={() => void switchChain(param)}>
      {children ? children : `Wrong Network`}
    </button>
  );
};
