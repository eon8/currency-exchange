import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { PocketType, selectPocket } from "../../actions/converter";
import { ICurrency } from "../../core/currency/Currency";
import { Pocket as PocketModel } from "../../core/pocket/Pocket";
import fetchRates from "../../fetchers/fetchRates";
import { IStoreState } from "../../reducers";
import { IPocketsState } from "../../reducers/pockets";
import PocketInput from "../pocket-input/PocketInput";
import "./Pocket.css";

interface IPocketStateProps {
  pockets: IPocketsState;
  currencies: ICurrency[];
  currency?: ICurrency;
  balance?: string;
}

interface IPocketDispatchProps {
  selectPocket: (slot: PocketType, currency: ICurrency) => void;
}

interface IPocketOwnProps {
  slot: PocketType;
  propagateConvert: () => void;
}

type IPocketProps = IPocketStateProps & IPocketDispatchProps & IPocketOwnProps;

interface IPocketState {
  isChanging: boolean;
}

export class PocketPure extends React.Component<IPocketProps, IPocketState> {
  state: IPocketState = { isChanging: false };

  render() {
    const { isChanging } = this.state;
    const {
      slot,
      currency,
      currencies,
      balance,
      propagateConvert
    } = this.props;
    return (
      <div className="Pocket">
        {isChanging ? (
          <div className="Pocket-list">{currencies.map(this.renderOption)}</div>
        ) : currency ? (
          <PocketInput
            slot={slot}
            currency={currency}
            balance={balance}
            change={this.change}
            propagateConvert={propagateConvert}
          />
        ) : (
          <div className="Pocket-select" onClick={this.change}>
            Select {slot === PocketType.FROM ? "source" : "destination"} pocket
          </div>
        )}
      </div>
    );
  }

  renderOption = (currency: ICurrency) => {
    return (
      <div
        className="Pocket-list-item"
        key={currency.code}
        onClick={this.select(currency)}
      >
        {currency.title}
        &nbsp;
        <small>
          (
          {new PocketModel(
            currency,
            this.props.pockets[currency.code]
          ).format()}
          )
        </small>
      </div>
    );
  };

  change = () => {
    this.setState({ isChanging: true });
    document.addEventListener("click", this.close);
  };

  select = (currency: ICurrency) => (event: React.MouseEvent) => {
    event.stopPropagation();
    this.props.selectPocket(this.props.slot, currency);
    this.close();
  };

  close = () => {
    this.setState({ isChanging: false });
    document.removeEventListener("click", this.close);
  };
}

const mapStateToProps = (
  state: IStoreState,
  ownProps: IPocketOwnProps
): IPocketStateProps => {
  const pockets = state.pockets;
  const currencies = Object.values(state.currencies);
  const currency = state.converter[ownProps.slot];
  const balance = currency ? state.pockets[currency.code] : undefined;
  return {
    pockets,
    currencies,
    currency,
    balance
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IPocketDispatchProps => ({
  selectPocket: (slot, currency) => {
    dispatch(selectPocket(slot, currency));
    if (slot === PocketType.FROM) {
      dispatch(fetchRates(currency.code) as any);
    }
  }
});

const Pocket = connect<
  IPocketStateProps,
  IPocketDispatchProps,
  IPocketOwnProps,
  IStoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(PocketPure);

export default Pocket;
