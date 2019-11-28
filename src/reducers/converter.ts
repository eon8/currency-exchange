import {
  IConverterAction,
  PocketType,
  SELECT_POCKET,
  SET_AMOUNT
} from "../actions/converter";
import { ICurrency } from "../core/currency/Currency";

export interface IConverterState {
  from?: ICurrency;
  to?: ICurrency;
  fromAmount: string;
  toAmount: string;
  valid: boolean;
}

export const defaultFromAmount = "";
export const defaultToAmount = "0.00";

export const initialConverterState: IConverterState = {
  fromAmount: defaultFromAmount,
  toAmount: defaultToAmount,
  valid: false
};

export default function converterReducer(
  state: IConverterState = initialConverterState,
  action: IConverterAction
): IConverterState {
  switch (action.type) {
    case SELECT_POCKET: {
      const { slot, currency } = action.payload;
      let newState = state;

      if (slot === PocketType.FROM) {
        newState = {
          ...state,
          from: currency
        };
        if (state.to && state.to.code === currency.code) {
          const { to, ...cleanState } = newState;
          newState = cleanState;
        }
      } else {
        newState = {
          ...state,
          to: currency
        };
        if (state.from && state.from.code === currency.code) {
          const { from, ...cleanState } = newState;
          newState = cleanState;
        }
      }

      return {
        ...newState,
        fromAmount: defaultFromAmount,
        toAmount: defaultToAmount
      };
    }

    case SET_AMOUNT: {
      const { fromAmount, toAmount, valid } = action.payload;
      return { ...state, fromAmount, toAmount, valid };
    }
  }

  return state;
}
