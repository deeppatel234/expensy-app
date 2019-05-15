import React, { Component } from "react";
import { connect } from "react-redux";
import _capitalize from "lodash/capitalize";

import TypoGraphy from "Components/TypoGraphy";
import Loader from "Components/Loader";
import Avatar from "Components/Avatar";
import Icon from "Components/Icon";

import Models from "Models";
import IconList from "Utils/IconList";
import { EXPENSE_TYPES } from 'Models/ExpenseModel';

import {
  WidgetWrapper,
  Details,
  LeftDetails,
  RightDetails,
  WidgetTitle,
  IconWrapper,
  SubDetails
} from "./style";

class CategoryWise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactionList: {},
      isLoading: true
    };
  }

  componentDidMount() {
    Models.get("expense")
      .getTransactionList(5)
      .then(transactionList => {
        console.tron.log(transactionList);
        this.setState({ transactionList, isLoading: false });
      })
      .catch(error => {
        console.tron.log("error", error);
      });
  }

  render() {
    const { transactionList, isLoading } = this.state;
    const { wallets, categories } = this.props;

    return (
      <WidgetWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <WidgetTitle>
              <TypoGraphy type="title">Last 5 Transaction</TypoGraphy>
            </WidgetTitle>
            {transactionList.map(transaction => (
              <Details key={transaction._id}>
                <LeftDetails>
                  <IconWrapper marginPosition="right">
                    <Avatar>
                      <Icon
                        type={IconList[categories[transaction.category].icon].type}
                        name={IconList[categories[transaction.category].icon].name}
                        size={20}
                      />
                    </Avatar>
                  </IconWrapper>
                  <SubDetails>
                    <TypoGraphy>{categories[transaction.category].name}</TypoGraphy>
                    <TypoGraphy appearance="muted">{transaction.description}</TypoGraphy>
                  </SubDetails>
                </LeftDetails>
                <RightDetails>
                  <SubDetails>
                    {
                      EXPENSE_TYPES.EXPENSE === transaction.type
                        ? <TypoGraphy appearance="danger">{transaction.amount.toFixed(2)}</TypoGraphy>
                        : <TypoGraphy>{transaction.amount.toFixed(2)}</TypoGraphy>
                    }
                    <TypoGraphy appearance="muted">{transaction.dateTime}</TypoGraphy>
                  </SubDetails>
                  <IconWrapper marginPosition="left">
                    <Avatar>
                      <Icon
                        type={IconList[wallets[transaction.wallet].icon].type}
                        name={IconList[wallets[transaction.wallet].icon].name}
                        size={20}
                      />
                    </Avatar>
                  </IconWrapper>
                </RightDetails>
              </Details>
            ))}
          </React.Fragment>
        )}
      </WidgetWrapper>
    );
  }
}

// Maps state from store to props
const mapStateToProps = state => {
  return {
    categories: state.categories,
    wallets: state.wallets,
  };
};

export default connect(mapStateToProps)(CategoryWise);