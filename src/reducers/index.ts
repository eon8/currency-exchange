import { combineReducers } from "redux";
import { default as converter, IConverterState } from "./converter";
import { default as currencies, ICurrenciesState } from "./currencies";
import { default as pockets, IPocketsState } from "./pockets";
import { default as rates, IRatesState } from "./rates";

export interface IStoreState {
  currencies: ICurrenciesState;
  converter: IConverterState;
  pockets: IPocketsState;
  rates: IRatesState;
}

const rootReducer = combineReducers<IStoreState>({
  currencies,
  converter,
  pockets,
  rates
});

export default rootReducer;
