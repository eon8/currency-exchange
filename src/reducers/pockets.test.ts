import { pocketTopUp, pocketWithdraw } from "../actions/pockets";
import { mockCurrencyUsd } from "../mocks/mockCurrency";
import pocketsReducer, { initialPocketsState, IPocketsState } from "./pockets";

const amount = "100.01";
const amountDoubled = "200.02";
const pocketsInitialState = {
  ...initialPocketsState,
  [mockCurrencyUsd.code]: "0.00",
  UAH: "1234.56"
};

describe("pocketsReducer", () => {
  it("should return the initial state", () => {
    expect(pocketsReducer(pocketsInitialState, {} as any)).toEqual(
      pocketsInitialState
    );
  });

  it("should handle empty POCKET_TOP_UP", () => {
    const expectedState: IPocketsState = {
      ...pocketsInitialState,
      [mockCurrencyUsd.code]: amount
    };
    const topUpAction = pocketTopUp(mockCurrencyUsd, amount);
    expect(pocketsReducer(pocketsInitialState, topUpAction)).toEqual(
      expectedState
    );
  });

  it("should handle existing POCKET_TOP_UP", () => {
    const existingPocketsInitialState = {
      ...pocketsInitialState,
      [mockCurrencyUsd.code]: amount
    };
    const expectedState: IPocketsState = {
      ...existingPocketsInitialState,
      [mockCurrencyUsd.code]: amountDoubled
    };
    const topUpAction = pocketTopUp(mockCurrencyUsd, amount);
    expect(pocketsReducer(existingPocketsInitialState, topUpAction)).toEqual(
      expectedState
    );
  });

  it("should handle POCKET_WITHDRAW", () => {
    const existingPocketsInitialState = {
      ...pocketsInitialState,
      [mockCurrencyUsd.code]: amount
    };
    const expectedState: IPocketsState = {
      ...existingPocketsInitialState,
      [mockCurrencyUsd.code]: "0.00"
    };
    const withdrawAction = pocketWithdraw(mockCurrencyUsd, amount);
    expect(pocketsReducer(existingPocketsInitialState, withdrawAction)).toEqual(
      expectedState
    );
  });
});
