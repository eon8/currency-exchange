import { mockCurrencyEur, mockCurrencyUsd } from "../../mocks/mockCurrency";
import { Pocket } from "./Pocket";

const initAmount = "100.01";
const initAmountDoubled = "200.02";
const initAmountWithCurrency = "$100.01";
const topUpAmount = "20.02";
const withdrawAmount = "30.03";
const afterTopUpAmount = "120.03";
const afterWithdrawAmount = "69.98";
const exceedAmount = "1000.01";

describe("Pocket model", () => {
  let pocket: Pocket;

  beforeEach(() => {
    pocket = new Pocket(mockCurrencyUsd, initAmount);
  });

  it("is initialized with type", () => {
    expect(pocket.getType()).toBe(mockCurrencyUsd);
  });

  it("is initialized with amount", () => {
    expect(pocket.getAmount()).toBe(initAmount);
  });

  it("is topped-up with amount", () => {
    expect(pocket.topUp(topUpAmount).getAmount()).toBe(afterTopUpAmount);
  });

  it("throws on invalid top-up amount", () => {
    const wrapper = (amount: string) => {
      return () => pocket.topUp(amount);
    };
    expect(wrapper("")).toThrow();
    expect(wrapper("asd")).toThrow();
    expect(wrapper("-10")).toThrow();
  });

  it("is withdrawn with amount", () => {
    expect(pocket.withdraw(withdrawAmount).getAmount()).toBe(
      afterWithdrawAmount
    );
  });

  it("throws on invalid withdraw amount", () => {
    const wrapper = (amount: string) => {
      return () => pocket.withdraw(amount);
    };
    expect(wrapper("")).toThrow();
    expect(wrapper("asd")).toThrow();
    expect(wrapper("-10")).toThrow();
  });

  it("throws on withdraw amount more than balance", () => {
    expect(() => pocket.withdraw(exceedAmount)).toThrow();
  });

  it("converts amount to passed currency by rate", () => {
    expect(pocket.convert(mockCurrencyEur, 2).getAmount()).toBe(
      initAmountDoubled
    );
  });

  it("formats amount with currency sign", () => {
    expect(pocket.format()).toBe(initAmountWithCurrency);
  });
});
