import { PocketType, selectPocket, setAmounts } from "../actions/converter";
import { mockCurrencyUsd } from "../mocks/mockCurrency";
import converterReducer, {
  IConverterState,
  initialConverterState
} from "./converter";

describe("converterReducer", () => {
  it("should return the initial state", () => {
    expect(converterReducer(initialConverterState, {} as any)).toEqual(
      initialConverterState
    );
  });

  it("should select from pocket", () => {
    const expectedState: IConverterState = {
      ...initialConverterState,
      from: mockCurrencyUsd
    };
    const selectPocketAction = selectPocket(PocketType.FROM, mockCurrencyUsd);
    expect(converterReducer(initialConverterState, selectPocketAction)).toEqual(
      expectedState
    );
  });

  it("should select to pocket", () => {
    const expectedState: IConverterState = {
      ...initialConverterState,
      to: mockCurrencyUsd
    };
    const selectPocketAction = selectPocket(PocketType.TO, mockCurrencyUsd);
    expect(converterReducer(initialConverterState, selectPocketAction)).toEqual(
      expectedState
    );
  });

  it("should select from and unselect to if same", () => {
    const toInitialState: IConverterState = {
      ...initialConverterState,
      to: mockCurrencyUsd
    };
    const expectedState: IConverterState = {
      ...initialConverterState,
      from: mockCurrencyUsd
    };
    const selectPocketAction = selectPocket(PocketType.FROM, mockCurrencyUsd);
    expect(converterReducer(toInitialState, selectPocketAction)).toEqual(
      expectedState
    );
  });

  it("should select to and unselect from if same", () => {
    const fromInitialState: IConverterState = {
      ...initialConverterState,
      from: mockCurrencyUsd
    };
    const expectedState: IConverterState = {
      ...initialConverterState,
      to: mockCurrencyUsd
    };
    const selectPocketAction = selectPocket(PocketType.TO, mockCurrencyUsd);
    expect(converterReducer(fromInitialState, selectPocketAction)).toEqual(
      expectedState
    );
  });

  it("should set amounts", () => {
    const expectedState: IConverterState = {
      ...initialConverterState,
      fromAmount: "300",
      toAmount: "100500",
      valid: true
    };
    const setAmountAction = setAmounts("300", "100500", true);
    expect(converterReducer(initialConverterState, setAmountAction)).toEqual(
      expectedState
    );
  });
});
