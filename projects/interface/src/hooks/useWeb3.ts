import {
  connectingChainIdState,
  currentChainState,
  eip1193State,
  useConnectWallet,
  useDisconnect,
  useSwitchChain,
} from "@/states/web3";
import {
  accountsSelector,
  currentChainNameSelector,
} from "@/states/web3/selector";
import { ethers } from "ethers";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

export const useWeb3 = () => {
  const connectWallet = useConnectWallet();
  const switchChain = useSwitchChain();
  const disconnect = useDisconnect();
  const ethereum = useRecoilValue(eip1193State);
  const accounts = useRecoilValue(accountsSelector);
  const connectingChain = useRecoilValue(connectingChainIdState);
  const currentChainName = useRecoilValue(currentChainNameSelector);
  const currentChain = useRecoilValue(currentChainState);
  const isConnected = Boolean(accounts.length);
  const fetchProvider = useMemo(
    () =>
      ethereum && connectingChain === currentChain.chainId
        ? new ethers.providers.Web3Provider(ethereum)
        : new ethers.providers.JsonRpcBatchProvider(currentChain.rpcUrls[0]),
    [ethereum]
  );

  return {
    connectWallet,
    switchChain,
    disconnect,
    ethereum,
    accounts,
    connectingChain,
    currentChainName,
    isConnected,
    fetchProvider,
  };
};
