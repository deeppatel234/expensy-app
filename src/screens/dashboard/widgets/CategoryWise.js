import React, { Component } from "react";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";

import TypoGraphy from "Components/TypoGraphy";
import Loader from "Components/Loader";
import Avatar from "Components/Avatar";

import Models from "Models";

import {
  WidgetWrapper,
  Details,
  LeftDetails,
  WidgetTitle,
  IconWrapper
} from "./style";


class CategoryWise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amounts: {},
      isLoading: true
    };
  }

  componentDidMount() {
    const { type } = this.props;
    Models.get("expense")
      .getAmountByCategory(type)
      .then(amounts => {
        this.setState({ amounts, isLoading: false });
      })
      .catch(error => {
        console.tron.log("error", error);
      });
  }

  render() {
    const { amounts, isLoading } = this.state;
    const { type, categories } = this.props;

    if (_isEmpty(categories)) {
      return false;
    }

    return (
      <WidgetWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <WidgetTitle>
              <TypoGraphy type="title">{`${_capitalize(
                type
              )} by Category`}</TypoGraphy>
            </WidgetTitle>
            {amounts.map(amount => (
              <Details key={amount.category}>
                <LeftDetails>
                  <IconWrapper marginPosition="right">
                    <Avatar.Icon iconKey={categories[amount.category].icon} />
                  </IconWrapper>
                  <TypoGraphy>{categories[amount.category].name}</TypoGraphy>
                </LeftDetails>
                <TypoGraphy>{amount.total.toFixed(2)}</TypoGraphy>
              </Details>
            ))}
          </React.Fragment>
        )}
      </WidgetWrapper>
    );
  }
}

export default CategoryWise;
