import React, { Component } from 'react';

import Typography from 'Components/Typography';
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
                  <Typography type="title">Overview</Typography>
                </WidgetTitle>
                <Details>
                  <Typography>Total Income</Typography>
                  <Typography>{fixedAmount(amounts.income)}</Typography>
                </Details>
                <Details>
                  <Typography>Total Expense</Typography>
                  <Typography appearance="red">- {fixedAmount(amounts.expense)}</Typography>
                </Details>
                <Line />
                <Details>
                  <Typography>Total Amount</Typography>
                  <Typography>{fixedAmount(amounts.income - amounts.expense)}</Typography>
                </Details>
              </React.Fragment>
            )
        }
      </WidgetWrapper>
    );
  }
}

export default TotalAmount;
