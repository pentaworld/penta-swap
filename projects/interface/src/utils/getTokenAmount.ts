import { JSBI, Token, TokenAmount } from "@penta-swap/sdk";

export const getTokenAmount = (token: Token, amount: string) =>
  new TokenAmount(
    token,
    JSBI.multiply(
      JSBI.BigInt(amount),
      JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(token.decimals))
    )
  );
