import { nullable, string } from "@recoiljs/refine";
import { atom } from "recoil";
import { syncEffect } from "recoil-sync";

export const modalState = atom<string | null>({
  key: "modal",
  default: null,
  effects: [syncEffect({ refine: nullable(string()) })],
});
