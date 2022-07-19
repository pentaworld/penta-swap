import { connectMethodNames, connectMethods } from "@/constant/connectMethods";
import { useWeb3 } from "@/hooks";
import { Connector } from "@/libs/connectors";
import { connectorIsValidStates } from "@/states/web3";
import { Account } from "@/states/web3/types";
import { ClipboardCopyIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import { memo, Suspense } from "react";
import { useRecoilValue } from "recoil";
import { Modal, ModalProps, ModalTitle } from "../Elements";

const AccountCard: React.FC<{ account: Account; close: () => void }> = ({
  account,
  close,
}) => {
  const { disconnect } = useWeb3();
  return (
    <div className="card gap-2 border-2 p-2 pt-4 sm:pt-6">
      <p className="px-4 text-2xl font-bold">{account.ellipsisAddress}</p>
      <div className="flex gap-1">
        <button className="btn btn-ghost btn-sm gap-1 px-0 normal-case">
          <ClipboardCopyIcon className="h-5 w-5" />
          Copy Address
        </button>
        <button className="btn btn-ghost btn-sm gap-1 px-0 normal-case">
          <ExternalLinkIcon className="h-5 w-5" />
          View on Explorer
        </button>
      </div>
      <div className="flex gap-1">
        <button
          className="btn-outline btn btn-primary btn-sm flex-1"
          onClick={disconnect}
        >
          Change
        </button>
        <button
          className="btn btn-secondary btn-sm flex-1"
          onClick={() => {
            close();
            disconnect();
          }}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};

const InfoModalBody: React.FC<{ close: () => void }> = ({ close }) => {
  const { accounts } = useWeb3();
  return (
    <>
      <ModalTitle className="text-lg font-bold">Account</ModalTitle>
      {accounts[0] && <AccountCard account={accounts[0]} close={close} />}
    </>
  );
};

const ConnectButton: React.FC<{
  name: string;
  symbol: string;
  connector: Connector;
}> = ({ name, symbol, connector }) => {
  const { connectWallet } = useWeb3();
  const isValid = useRecoilValue(
    connectorIsValidStates(name as connectMethodNames)
  );

  return isValid ? (
    <button
      className="btn btn-ghost btn-block btn-lg justify-start px-0 text-2xl normal-case"
      onClick={() => void connectWallet(connector)}
    >
      <img className="aspect-square h-full" src={symbol} />
      {name}
    </button>
  ) : (
    <></>
  );
};

const ConnectModalBody = () => {
  return (
    <>
      <ModalTitle className="text-lg font-bold">Connect Wallet</ModalTitle>
      <div className="flex flex-col">
        {Object.values(connectMethods).map(([name, symbol, connector]) => (
          <Suspense key={name}>
            <ConnectButton {...{ name, symbol, connector }} />
          </Suspense>
        ))}
      </div>
    </>
  );
};

// eslint-disable-next-line react/display-name
export const AccountModal: React.FC<ModalProps> = memo((props) => {
  const { isConnected } = useWeb3();
  return (
    <Modal className="flex flex-col gap-2 p-4 sm:p-6" {...props}>
      {isConnected ? (
        <InfoModalBody close={props.onClose} />
      ) : (
        <ConnectModalBody />
      )}
    </Modal>
  );
});
