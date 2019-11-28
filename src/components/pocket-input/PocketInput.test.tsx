import { shallow } from "enzyme";
import React from "react";
import { PocketType } from "../../actions/converter";
import { mockCurrencyEur, mockCurrencyUsd } from "../../mocks/mockCurrency";
import { PocketInputPure } from "./PocketInput";

describe("PocketInput component", () => {
  let mockSetAmounts: any;

  beforeEach(() => {
    mockSetAmounts = jest.fn();
  });

  it("calls setAmounts from props", () => {
    const cmp = shallow(
      <PocketInputPure
        from={mockCurrencyUsd}
        to={mockCurrencyEur}
        fromBalance={"1000.00"}
        rate={2}
        fromAmount={"0.00"}
        toAmount={"1.00"}
        valid={false}
        slot={PocketType.TO}
        currency={mockCurrencyEur}
        balance={"0.00"}
        change={jest.fn()}
        setAmounts={mockSetAmounts}
      />
    );

    (cmp.instance() as PocketInputPure).updateAmounts(PocketType.TO, "2.00");

    expect(mockSetAmounts).toHaveBeenCalledWith("1.00", "2.00", true);
  });
});
