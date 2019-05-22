import React, { Component } from 'react';

import TypoGraphy from 'Components/TypoGraphy';
import Loader from 'Components/Loader';

import Models from 'Models';
import { fixedAmount } from 'Utils/utility';

import { WidgetWrapper, Details, Line, WidgetTitle } from './style';

class TotalAmount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amounts: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    Models.get('expense').getTotalAmount()
      .then((totalAmount) => {
        this.setState({ amounts: totalAmount, isLoading: false });
      }).catch((error) => {
        console.tron.log('error', error);
      });
  }

  render() {
    const { amounts, isLoading } = this.state;

    return (
      <WidgetWrapper>
        {
          isLoading
            ? <Loader />
            : (
              <React.Fragment>
                <WidgetTitle>
                  <TypoGraphy type="title">Overview</TypoGraphy>
                </WidgetTitle>
                <Details>
                  <TypoGraphy>Total Income</TypoGraphy>
                  <TypoGraphy>{fixedAmount(amounts.income)}</TypoGraphy>
                </Details>
                <Details>
                  <TypoGraphy>Total Expense</TypoGraphy>
                  <TypoGraphy appearance="red">- {fixedAmount(amounts.expense)}</TypoGraphy>
                </Details>
                <Line />
                <Details>
                  <TypoGraphy>Total Amount</TypoGraphy>
                  <TypoGraphy>{fixedAmount(amounts.income - amounts.expense)}</TypoGraphy>
                </Details>
              </React.Fragment>
            )
        }
      </WidgetWrapper>
    );
  }
}

export default TotalAmount;
