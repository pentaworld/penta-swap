import {
  connectingChainIdState,
  eip1193State,
  useConnectWallet,
  useDisconnect,
  useSwitchChain,
} from "@/states/web3";
import {
  accountsSelector,
  currentChainNameSelector,
  fetchProviderSelector,
} from "@/states/web3/selector";
import { useRecoilValue } from "recoil";

export const useWeb3 = () => {
  const connectWallet = useConnectWallet();
  const switchChain = useSwitchChain();
  const disconnect = useDisconnect();
  const ethereum = useRecoilValue(eip1193State);
  const fetchProvider = useRecoilValue(fetchProviderSelector);
  const accounts = useRecoilValue(accountsSelector);
  const connectingChain = useRecoilValue(connectingChainIdState);
  const currentChainName = useRecoilValue(currentChainNameSelector);
  const isConnected = Boolean(accounts.length);

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
