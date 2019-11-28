import {
  fetchRatesFail,
  fetchRatesStart,
  fetchRatesStop,
  fetchRatesSuccess
} from "../actions/rates";
import ratesReducer, {
  initialRatesState,
  IRatesFetchStatus,
  IRatesState
} from "./rates";

const currencyCode = "USD";
const data = { EUR: 0.91, GBP: 0.82, UAH: 25.0 };
const error = "Unexpected error";

describe("ratesReducer", () => {
  it("should return the initial state", () => {
    expect(ratesReducer(initialRatesState, {} as any)).toEqual(
      initialRatesState
    );
  });

  it("should handle FETCH_RATES_START", () => {
    const expectedState: IRatesState = {
      ...initialRatesState,
      [currencyCode]: {
        status: IRatesFetchStatus.FETCHING
      }
    };
    const startAction = fetchRatesStart(currencyCode);
    expect(ratesReducer(initialRatesState, startAction)).toEqual(expectedState);
  });

  it("should handle FETCH_RATES_SUCCESS", () => {
    const expectedState: IRatesState = {
      ...initialRatesState,
      [currencyCode]: {
        status: IRatesFetchStatus.PENDING,
        data
      }
    };
    const successAction = fetchRatesSuccess(currencyCode, data);
    expect(ratesReducer(initialRatesState, successAction)).toEqual(
      expectedState
    );
  });

  it("should handle FETCH_RATES_FAIL", () => {
    const expectedState: IRatesState = {
      ...initialRatesState,
      [currencyCode]: {
        status: IRatesFetchStatus.PENDING,
        error
      }
    };
    const failAction = fetchRatesFail(currencyCode, error);
    expect(ratesReducer(initialRatesState, failAction)).toEqual(expectedState);
  });

  it("should handle FETCH_RATES_STOP", () => {
    const state: IRatesState = {
      ...initialRatesState,
      [currencyCode]: {
        status: IRatesFetchStatus.PENDING,
        data,
        error
      }
    };
    const expectedState: IRatesState = {
      ...state,
      [currencyCode]: {
        ...state[currencyCode],
        status: IRatesFetchStatus.SLEEPING,
        error: undefined
      }
    };
    const failAction = fetchRatesStop(currencyCode);
    expect(ratesReducer(state, failAction)).toEqual(expectedState);
  });
});
