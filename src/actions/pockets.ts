import { ICurrency } from "../core/currency/Currency";

export const POCKET_TOP_UP = "POCKET_TOP_UP";
export const POCKET_WITHDRAW = "POCKET_WITHDRAW";

export interface IPocketTopUp {
  type: typeof POCKET_TOP_UP;
  payload: {
    currency: ICurrency;
    amount: string;
  };
}

export interface IPocketWithdraw {
  type: typeof POCKET_WITHDRAW;
  payload: {
    currency: ICurrency;
    amount: string;
  };
}

export type IPocketsAction = IPocketTopUp | IPocketWithdraw;

export function pocketTopUp(currency: ICurrency, amount: string): IPocketTopUp {
  return {
    type: POCKET_TOP_UP,
    payload: {
      currency,
      amount
    }
  };
}

export function pocketWithdraw(
  currency: ICurrency,
  amount: string
): IPocketWithdraw {
  return {
    type: POCKET_WITHDRAW,
    payload: {
      currency,
      amount
    }
  };
}
