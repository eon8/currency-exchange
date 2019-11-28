import { ICurrency } from "../core/currency/Currency";

export const SELECT_POCKET = "SELECT_POCKET";
export const SET_AMOUNT = "SET_AMOUNT";

export enum PocketType {
  FROM = "from",
  TO = "to"
}

export interface ISelectPocket {
  type: typeof SELECT_POCKET;
  payload: {
    slot: PocketType;
    currency: ICurrency;
  };
}

export interface ISetAmount {
  type: typeof SET_AMOUNT;
  payload: {
    fromAmount: string;
    toAmount: string;
    valid: boolean;
  };
}

export type IConverterAction = ISelectPocket | ISetAmount;

export function selectPocket(
  slot: PocketType,
  currency: ICurrency
): ISelectPocket {
  return {
    type: SELECT_POCKET,
    payload: {
      slot,
      currency
    }
  };
}

export function setAmounts(
  fromAmount: string,
  toAmount: string,
  valid: boolean
): ISetAmount {
  return {
    type: SET_AMOUNT,
    payload: {
      fromAmount,
      toAmount,
      valid
    }
  };
}
