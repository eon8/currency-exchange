import { shallow } from "enzyme";
import React from "react";
import { mockCurrencyEur, mockCurrencyUsd } from "../../mocks/mockCurrency";
import { ConverterPure } from "./Converter";

describe("Converter component", () => {
  let mockConvert: any;

  beforeEach(() => {
    mockConvert = jest.fn();
  });

  it("renders converter lines", () => {
    const cmp = shallow(
      <ConverterPure
        fromAmount={""}
        toAmount={""}
        valid={false}
        convert={mockConvert}
      />
    );
    expect(cmp.find(".Converter-line").length).toBe(2);
  });

  it("calls convert from props", () => {
    const cmp = shallow(
      <ConverterPure
        from={mockCurrencyUsd}
        to={mockCurrencyEur}
        fromAmount={"1"}
        toAmount={"2"}
        valid={true}
        convert={mockConvert}
      />
    );
    (cmp.instance() as ConverterPure).convert();
    expect(mockConvert).toHaveBeenCalledWith(
      mockCurrencyUsd,
      mockCurrencyEur,
      "1",
      "2"
    );
  });
});
