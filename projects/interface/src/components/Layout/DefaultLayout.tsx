import { useCurrentChain } from "@/hooks";
import { useWeb3 } from "@inaridiy/useful-web3";
import clsx from "clsx";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import logoImage from "../../../public/penta.png";
import { ConnectWallet, SwitchNetwork } from "../Buttons";

const Header: React.VFC = () => {
  return (
    <header className="fixed top-0 w-full">
      <div className="gap-4 mx-auto max-w-screen-lg navbar">
        <div className="navbar-start">
          <a className="relative py-0 w-36 sm:w-48 btn btn-ghost">
            <Image src={logoImage} alt="logo" className="w-full" />
          </a>
        </div>

        <nav className="fixed bottom-2 justify-center w-full sm:static sm:w-auto navbar-center">
          <Nav />
        </nav>

        <div className="navbar-end">
          <Account />
        </div>
      </div>
    </header>
  );
};

const Account: React.VFC = () => {
  const { accounts, chainId } = useWeb3();
  const { param } = useCurrentChain();
  const name = accounts[0]
    ? `${accounts[0].slice(0, 5)}...${accounts[0].slice(-4)}`
    : null;

  if (name && chainId !== param.chainId) {
    return <SwitchNetwork className="btn btn-error" />;
  }

  if (name) {
    return <div className="text-lg font-bold">{name}</div>;
  }
  return <ConnectWallet className="btn btn-ghost" />;
};

const Nav: React.VFC = () => {
  const { pathname } = useRouter();
  return (
    <ul className="p-2 font-bold shadow-lg sm:gap-2 menu bg-base-100 menu-horizontal card">
      <li>
        <NextLink href="/swap">
          <a
            className={clsx(
              pathname === "/swap" && "bg-secondary text-secondary-content"
            )}
          >
            Swap
          </a>
        </NextLink>
      </li>
      <li>
        <NextLink href="/pool">
          <a
            className={clsx(
              pathname === "/pool" && "bg-secondary text-secondary-content"
            )}
          >
            Pool
          </a>
        </NextLink>
      </li>
      <li>
        <a>Penta</a>
      </li>
    </ul>
  );
};

export const DefaultLayout: React.VFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className="flex relative flex-col min-h-full transition-all bg-base-200 text-base-content"
      data-theme="dark"
    >
      <Header />
      <div className="grow mt-16 sm:mt-32 text-base-content">{children}</div>
    </div>
  );
};
