import { ICurrency } from "../currency/Currency.interface";
import { Pocket } from "./Pocket";

const type: ICurrency = {
  code: "USD",
  sign: "$",
  title: "Dollar"
};
const initAmount = "100.01";
const initAmountWithCurrency = "$100.01";
const topUpAmount = "20.02";
const withdrawAmount = "30.03";
const afterTopUpAmount = "120.03";
const afterWithdrawAmount = "69.98";
const exceedAmount = "1000.01";

describe("Pocket", () => {
  let pocket: Pocket;
  beforeEach(() => {
    pocket = new Pocket(type, initAmount);
  });
  it("is initialized with type", () => {
    expect(pocket.getType()).toBe(type);
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
  it("formats amount with currency sign", () => {
    expect(pocket.format()).toBe(initAmountWithCurrency);
  });
});
