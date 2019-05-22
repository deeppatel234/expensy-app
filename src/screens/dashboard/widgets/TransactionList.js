import React, { Component } from "react";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";

import Typography from "Components/Typography";
import Loader from "Components/Loader";
import Avatar from "Components/Avatar";

import Models from "Models";
import { EXPENSE_TYPES } from 'Models/ExpenseModel';

import {
  WidgetWrapper,
  Details,
  LeftDetails,
  RightDetails,
  WidgetTitle,
  IconWrapper,
  SubDetails,
  RightText,
} from "./style";

class TransactionList extends Component {
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

    if (_isEmpty(categories) || _isEmpty(wallets)) {
      return false;
    }

    return (
      <WidgetWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <WidgetTitle>
              <Typography type="title">Last 5 Transaction</Typography>
            </WidgetTitle>
            {transactionList.map(transaction => (
              <Details key={transaction._id}>
                <LeftDetails>
                  <IconWrapper marginPosition="right">
                    <Avatar.Icon iconKey={categories[transaction.category].icon} />
                  </IconWrapper>
                  <SubDetails>
                    <Typography>{categories[transaction.category].name}</Typography>
                    <Typography appearance="gray">{transaction.description}</Typography>
                  </SubDetails>
                </LeftDetails>
                <RightDetails>
                  <SubDetails>
                    <RightText>
                      {
                        EXPENSE_TYPES.EXPENSE === transaction.type
                          ? <Typography appearance="red">{transaction.amount.toFixed(2)}</Typography>
                          : <Typography>{transaction.amount.toFixed(2)}</Typography>
                      }
                    </RightText>
                    <Typography appearance="gray">{transaction.dateTime}</Typography>
                  </SubDetails>
                  <IconWrapper marginPosition="left">
                    <Avatar.Icon iconKey={wallets[transaction.wallet].icon} />
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

export default TransactionList;
