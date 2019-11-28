import {
  IPocketsAction,
  POCKET_TOP_UP,
  POCKET_WITHDRAW
} from "../actions/pockets";
import { Pocket } from "../core/pocket/Pocket";

export interface IPocketsState {
  [currencyCode: string]: string;
}

export const initialPocketsState: IPocketsState = {
  USD: (Math.random() * 4900 + 100).toFixed(2),
  EUR: (Math.random() * 3950 + 50).toFixed(2),
  GBP: (Math.random() * 3000).toFixed(2)
};

export default function pocketsReducer(
  state: IPocketsState = initialPocketsState,
  action: IPocketsAction
): IPocketsState {
  switch (action.type) {
    case POCKET_TOP_UP: {
      const { currency, amount } = action.payload;
      const initAmount = state[currency.code];
      return {
        ...state,
        [currency.code]: new Pocket(currency, initAmount)
          .topUp(amount)
          .getAmount()
      };
    }

    case POCKET_WITHDRAW: {
      const { currency, amount } = action.payload;
      const initAmount = state[currency.code];
      return {
        ...state,
        [currency.code]: new Pocket(currency, initAmount)
          .withdraw(amount)
          .getAmount()
      };
    }
  }

  return state;
}
