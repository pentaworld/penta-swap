import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "./atoms";

export const useModal = (key: string) => {
  const [openingKey, setKey] = useRecoilState(modalState);
  const isOpen = openingKey === key;

  const close = useCallback(() => setKey(""), [setKey]);
  const open = useCallback(() => setKey(key), [key, setKey]);
  const setIsOpen = useCallback(
    (state: boolean) => (state ? open() : close()),
    [open, close]
  );
  return { isOpen, setIsOpen, close, open };
};
