import invariant from "@/utils/invariant";
import { parseChainId } from "@/utils/parseChainId";
import detector from "@metamask/detect-provider";
import type { Connector, EIP1193 } from "./types";

/**
 * @dev Metamaskを使ってwalletに接続する
 */
export class MetamaskConnector implements Connector {
  async connect(): Promise<
    [eip1193: EIP1193, chainId: number, accounts: string[]]
  > {
    const eip1193 = (await detector()) as EIP1193;
    invariant(eip1193 && eip1193?.request, "Unauthorized Wallet");

    const [chainId, accounts] = (await Promise.all([
      eip1193.request({ method: "eth_chainId" }),
      eip1193.request({ method: "eth_requestAccounts" }),
    ])) as [string, string[]];

    return [eip1193, parseChainId(chainId), [...accounts]];
  }

  async isValid(): Promise<boolean> {
    return Boolean(await detector());
  }
}
