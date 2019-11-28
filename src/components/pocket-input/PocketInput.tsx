import React from "react";
import { connect } from "react-redux";
import { PocketType, setAmounts } from "../../actions/converter";
import { ICurrency } from "../../core/currency/Currency";
import { Pocket } from "../../core/pocket/Pocket";
import { IStoreState } from "../../reducers";
import { IRatesData } from "../../reducers/rates";
import "./PocketInput.css";

interface IPocketInputStateProps {
  from?: ICurrency;
  to?: ICurrency;
  fromBalance: string;
  rate?: number;
  fromAmount: string;
  toAmount: string;
  valid: boolean;
}

interface IPocketInputDispatchProps {
  setAmounts: typeof setAmounts;
}

interface IPocketInputOwnProps {
  slot: PocketType;
  currency: ICurrency;
  balance?: string;
  change: () => void;
  propagateConvert: () => void;
}

type IPocketInputProps = IPocketInputStateProps &
  IPocketInputDispatchProps &
  IPocketInputOwnProps;

export class PocketInputPure extends React.Component<IPocketInputProps> {
  input: HTMLInputElement | null = null;

  componentDidUpdate(
    prevProps: Readonly<IPocketInputProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    if (
      this.input &&
      (prevProps.from !== this.props.from ||
        prevProps.to !== this.props.to ||
        prevProps.fromBalance !== this.props.fromBalance)
    ) {
      this.input.focus();
    }
  }

  render() {
    const { currency, balance } = this.props;
    const balanceFormatted = new Pocket(currency, balance).format();
    return (
      <div className="PocketInput">
        <div className="PocketInput-top">
          <div
            className="nowrap noshrink clickable"
            onClick={this.props.change}
          >
            {currency.code}
          </div>
          {this.renderValue()}
        </div>
        <div className="PocketInput-bottom">
          <span className="nowrap">You have {balanceFormatted}</span>
          {this.renderRate()}
        </div>
      </div>
    );
  }

  renderValue() {
    const { slot, from, to, rate, fromAmount, toAmount, valid } = this.props;
    if (!from || !to || !rate) {
      return null;
    }

    const invalid =
      slot === PocketType.FROM && parseFloat(fromAmount) && !valid;

    return (
      <input
        className={"PocketInput-field" + (invalid ? " invalid" : "")}
        value={slot === PocketType.FROM ? fromAmount : toAmount}
        onChange={this.onChange(slot)}
        onKeyPress={this.onKeyPress}
        ref={input => {
          if (slot === PocketType.FROM) {
            this.input = input;
          }
        }}
      />
    );
  }

  renderRate() {
    const { slot, from, currency, rate } = this.props;
    const showRate = slot === PocketType.TO && from && rate;
    if (!showRate) {
      return null;
    }
    const left = new Pocket(from!, "1").format(0);

    const right = new Pocket(currency, `${rate}`).format(4);
    return (
      <span className="nowrap">
        {left} = {right}
      </span>
    );
  }

  onChange = (slot: PocketType) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.updateAmounts(slot, event.target.value);
  };

  onKeyPress = (event: React.KeyboardEvent) => {
    if (event.charCode === 13) {
      this.props.propagateConvert();
    }
  };

  updateAmounts = (slot: PocketType, amount: string) => {
    const regex = /^\d+(\.\d{0,2})?$/;
    const sign = {
      [PocketType.FROM]: "-",
      [PocketType.TO]: "+"
    };
    if (amount && amount[0] === sign[slot]) {
      amount = amount.slice(1);
    }
    if (amount && amount[0] === ".") {
      amount = "0." + amount.slice(1, 3);
    }
    if (amount && !amount.match(regex)) {
      return;
    }

    let fromAmount;
    let toAmount;

    if (slot === PocketType.FROM) {
      fromAmount = amount;
      toAmount = new Pocket(this.props.from!, amount)
        .convert(this.props.to!, this.props.rate!)
        .getAmount();
    } else {
      toAmount = amount;
      fromAmount = new Pocket(this.props.to!, amount)
        .convert(this.props.from!, 1 / this.props.rate!)
        .getAmount();
    }

    const valid =
      parseFloat(fromAmount) > 0 &&
      parseFloat(fromAmount) <= parseFloat(this.props.fromBalance);

    this.props.setAmounts(fromAmount, toAmount, valid);
  };
}

const mapStateToProps = (state: IStoreState): IPocketInputStateProps => {
  const { from, to, fromAmount, toAmount, valid } = state.converter;
  const fromBalance = (from && state.pockets[from.code]) || "0";

  let rate: number | undefined;
  if (from && to) {
    const rates: IRatesData = state.rates[from.code];
    if (rates && rates.data && rates.data[to.code]) {
      rate = rates.data[to.code];
    }
  }

  return {
    from,
    to,
    fromBalance,
    rate,
    fromAmount: fromAmount ? "-" + fromAmount : "",
    toAmount: toAmount ? "+" + toAmount : "",
    valid
  };
};

const mapDispatchToProps = {
  setAmounts
};

const PocketInput = connect<
  IPocketInputStateProps,
  IPocketInputDispatchProps,
  IPocketInputOwnProps,
  IStoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(PocketInputPure);

export default PocketInput;
