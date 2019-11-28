import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { PocketType, setAmounts } from "../../actions/converter";
import { pocketTopUp, pocketWithdraw } from "../../actions/pockets";
import { ICurrency } from "../../core/currency/Currency";
import { IStoreState } from "../../reducers";
import { defaultFromAmount, defaultToAmount } from "../../reducers/converter";
import Pocket from "../pocket/Pocket";
import "./Converter.css";

export interface IConverterStateProps {
  from?: ICurrency;
  to?: ICurrency;
  fromAmount: string;
  toAmount: string;
  valid: boolean;
}

export interface IConverterDispatchProps {
  convert: (
    from: ICurrency,
    to: ICurrency,
    fromAmount: string,
    toAmount: string
  ) => void;
}

export type IConverterProps = IConverterStateProps & IConverterDispatchProps;

export class ConverterPure extends React.Component<IConverterProps> {
  render() {
    const { valid } = this.props;
    return (
      <div>
        <div className="Converter">
          <div className="Converter-line">
            <Pocket slot={PocketType.FROM} propagateConvert={this.convert} />
          </div>
          <div className="Converter-line">
            <Pocket slot={PocketType.TO} propagateConvert={this.convert} />
          </div>
        </div>
        {valid ? (
          <button className="Converter-button" onClick={this.convert}>
            Convert
          </button>
        ) : null}
      </div>
    );
  }

  convert = () => {
    const { valid, from, to, fromAmount, toAmount } = this.props;
    if (from && to && valid) {
      this.props.convert(from, to, fromAmount, toAmount);
    }
  };
}

const mapStateToProps = (state: IStoreState): IConverterStateProps => {
  const { from, to, fromAmount, toAmount, valid } = state.converter;
  return { from, to, fromAmount, toAmount, valid };
};

const mapDispatchToProps = (dispatch: Dispatch): IConverterDispatchProps => ({
  convert: (
    from: ICurrency,
    to: ICurrency,
    fromAmount: string,
    toAmount: string
  ) => {
    dispatch(pocketWithdraw(from, fromAmount));
    dispatch(pocketTopUp(to, toAmount));
    dispatch(setAmounts(defaultFromAmount, defaultToAmount, false));
  }
});

const Converter = connect(mapStateToProps, mapDispatchToProps)(ConverterPure);

export default Converter;
