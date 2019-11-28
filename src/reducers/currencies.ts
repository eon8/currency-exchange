import { IConverterAction } from "../actions/converter";
import { ICurrency } from "../core/currency/Currency";

export interface ICurrenciesState {
  [currencyCode: string]: ICurrency;
}

export const initialCurrenciesState: ICurrenciesState = {
  USD: {
    code: "USD",
    sign: "$",
    title: "US dollar"
  },
  EUR: {
    code: "EUR",
    sign: "€",
    title: "Euro"
  },
  GBP: {
    code: "GBP",
    sign: "£",
    title: "Pound sterling"
  },
  JPY: {
    code: "JPY",
    sign: "¥",
    title: "Japanese yen"
  },
  CAD: {
    code: "CAD",
    sign: "C$",
    title: "Canadian dollar"
  }
};

export default function currenciesReducer(
  state: ICurrenciesState = initialCurrenciesState,
  action: IConverterAction
): ICurrenciesState {
  return state;
}
