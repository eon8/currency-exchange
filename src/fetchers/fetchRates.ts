import { Dispatch } from "redux";
import {
  fetchRatesFail,
  fetchRatesStart,
  fetchRatesStop,
  fetchRatesSuccess
} from "../actions/rates";
import { IStoreState } from "../reducers";

const DELAY = 10000;
let timeout: NodeJS.Timeout;

function fetchRates(currencyCode: string) {
  return (dispatch: Dispatch, getState: () => IStoreState) => {
    clearTimeout(timeout);
    dispatch(fetchRatesStart(currencyCode));

    fetch("https://api.exchangeratesapi.io/latest?base=" + currencyCode)
      .then(res => res.json())
      .then(res => {
        dispatch(fetchRatesSuccess(currencyCode, res.rates));

        const state: IStoreState = getState();
        // tslint:disable-next-line:no-console
        console.log(state);

        if (
          state.converter.from &&
          state.converter.from.code === currencyCode
        ) {
          timeout = setTimeout(() => {
            dispatch(fetchRates(currencyCode) as any);
          }, DELAY);
        } else {
          dispatch(fetchRatesStop(currencyCode));
        }
      })
      .catch(error => {
        dispatch(fetchRatesFail(currencyCode, error));
      });
  };
}

export default fetchRates;
