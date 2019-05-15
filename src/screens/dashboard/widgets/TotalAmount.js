import React, { Component } from 'react';

import TypoGraphy from 'Components/TypoGraphy';
import Loader from 'Components/Loader';

import Models from 'Models';

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
                  <TypoGraphy>{amounts.income.toFixed(2)}</TypoGraphy>
                </Details>
                <Details>
                  <TypoGraphy>Total Expense</TypoGraphy>
                  <TypoGraphy appearance="danger">- {amounts.expense.toFixed(2)}</TypoGraphy>
                </Details>
                <Line />
                <Details>
                  <TypoGraphy>Total Amount</TypoGraphy>
                  <TypoGraphy>{(amounts.income - amounts.expense).toFixed(2)}</TypoGraphy>
                </Details>
              </React.Fragment>
            )
        }
      </WidgetWrapper>
    );
  }
}

export default TotalAmount;