import Decimal from "decimal.js";
import { ICurrency } from "../currency/Currency";

export class Pocket {
  private balance: Decimal;

  constructor(private currency: ICurrency, initBalance?: string) {
    this.balance = new Decimal(initBalance || "0.00");
  }

  public getType(): ICurrency {
    return this.currency;
  }

  public getAmount(): string {
    return this.balance.toFixed(2);
  }

  public topUp(amount: string): Pocket {
    const delta = this.normalize(amount);
    this.balance = this.balance.add(delta);
    return this;
  }

  public withdraw(amount: string): Pocket {
    const delta = this.normalize(amount);
    if (delta.greaterThan(this.balance)) {
      throw new Error("Amount is greater that balance");
    }
    this.balance = this.balance.sub(delta);
    return this;
  }

  public convert(to: ICurrency, rate: number): Pocket {
    return new Pocket(to, this.balance.mul(rate).toFixed(2));
  }

  public format(precision: number = 2): string {
    return `${this.currency.sign}${this.balance.toFixed(precision)}`;
  }

  private normalize(amount: string): Decimal {
    const result = new Decimal(amount);
    if (result.isNegative()) {
      throw new Error("Amount cannot be negative");
    }
    return result;
  }
}
