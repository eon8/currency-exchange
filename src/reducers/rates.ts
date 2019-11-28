import {
  FETCH_RATES_FAIL,
  FETCH_RATES_START,
  FETCH_RATES_STOP,
  FETCH_RATES_SUCCESS,
  IRatesAction
} from "../actions/rates";

export enum IRatesFetchStatus {
  FETCHING = "fetching",
  PENDING = "pending",
  SLEEPING = "sleeping"
}

export interface IRatesData {
  status: IRatesFetchStatus;
  data?: Record<string, number>;
  error?: string;
}

export interface IRatesState {
  [currencyCode: string]: IRatesData;
}

export const initialRatesState: IRatesState = {};

export default function ratesReducer(
  state: IRatesState = initialRatesState,
  action: IRatesAction
): IRatesState {
  switch (action.type) {
    case FETCH_RATES_START: {
      const { currencyCode } = action.payload;
      return {
        ...state,
        [currencyCode]: {
          ...state[currencyCode],
          status: IRatesFetchStatus.FETCHING
        }
      };
    }

    case FETCH_RATES_SUCCESS: {
      const { currencyCode, data } = action.payload;
      return {
        ...state,
        [currencyCode]: {
          ...state[currencyCode],
          status: IRatesFetchStatus.PENDING,
          data
        }
      };
    }

    case FETCH_RATES_FAIL: {
      const { currencyCode, error } = action.payload;
      return {
        ...state,
        [currencyCode]: {
          ...state[currencyCode],
          status: IRatesFetchStatus.PENDING,
          error
        }
      };
    }

    case FETCH_RATES_STOP: {
      const { currencyCode } = action.payload;
      return {
        ...state,
        [currencyCode]: {
          ...state[currencyCode],
          status: IRatesFetchStatus.SLEEPING,
          error: undefined
        }
      };
    }
  }

  return state;
}
