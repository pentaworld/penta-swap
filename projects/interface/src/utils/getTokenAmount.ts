import { Token, TokenAmount } from "@penta-swap/sdk";
import { ethers } from "ethers";

export const getTokenAmount = (token: Token, amount: string) => {
  return new TokenAmount(
    token,
    ethers.utils
      .parseUnits(amount.length > 0 ? amount : "0", token.decimals)
      .toString()
  );
};
