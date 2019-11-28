export const FETCH_RATES_START = "FETCH_RATES_START";
export const FETCH_RATES_SUCCESS = "FETCH_RATES_SUCCESS";
export const FETCH_RATES_FAIL = "FETCH_RATES_FAIL";
export const FETCH_RATES_STOP = "FETCH_RATES_STOP";

export interface IFetchRatesStart {
  type: typeof FETCH_RATES_START;
  payload: {
    currencyCode: string;
  };
}

export interface IFetchRatesSuccess {
  type: typeof FETCH_RATES_SUCCESS;
  payload: {
    currencyCode: string;
    data: Record<string, number>;
  };
}

export interface IFetchRatesFail {
  type: typeof FETCH_RATES_FAIL;
  payload: {
    currencyCode: string;
    error: string;
  };
}

export interface IFetchRatesStop {
  type: typeof FETCH_RATES_STOP;
  payload: {
    currencyCode: string;
  };
}

export type IRatesAction =
  | IFetchRatesStart
  | IFetchRatesSuccess
  | IFetchRatesFail
  | IFetchRatesStop;

export function fetchRatesStart(currencyCode: string): IFetchRatesStart {
  return {
    type: FETCH_RATES_START,
    payload: {
      currencyCode
    }
  };
}

export function fetchRatesSuccess(
  currencyCode: string,
  data: Record<string, number>
): IFetchRatesSuccess {
  return {
    type: FETCH_RATES_SUCCESS,
    payload: {
      currencyCode,
      data
    }
  };
}

export function fetchRatesFail(
  currencyCode: string,
  error: string
): IFetchRatesFail {
  return {
    type: FETCH_RATES_FAIL,
    payload: {
      currencyCode,
      error
    }
  };
}

export function fetchRatesStop(currencyCode: string): IFetchRatesStop {
  return {
    type: FETCH_RATES_STOP,
    payload: {
      currencyCode
    }
  };
}
