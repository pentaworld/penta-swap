import { ThemeBox } from "@/components/Layout";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, memo } from "react";

export type ModalProps = {
  children?: React.ReactNode;
  open: boolean;
  className?: string;
  onClose: () => void;
};

export const ModalTitle = Dialog.Title;

// eslint-disable-next-line react/display-name
export const Modal: React.FC<ModalProps> = memo(
  ({ children, className, open, onClose }) => {
    return (
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => onClose()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <ThemeBox
            transparent
            className="flex fixed inset-0 justify-center items-end p-4 sm:items-center"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  "overflow-auto w-full max-w-lg rounded-2xl shadow-xl bg-base-100",
                  className
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </ThemeBox>
        </Dialog>
      </Transition>
    );
  }
);
