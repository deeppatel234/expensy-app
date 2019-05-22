import React, { Component } from "react";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";

import Typography from "Components/Typography";
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
              <Typography type="title">{`${_capitalize(
                type
              )} by Category`}</Typography>
            </WidgetTitle>
            {amounts.map(amount => (
              <Details key={amount.category}>
                <LeftDetails>
                  <IconWrapper marginPosition="right">
                    <Avatar.Icon iconKey={categories[amount.category].icon} />
                  </IconWrapper>
                  <Typography>{categories[amount.category].name}</Typography>
                </LeftDetails>
                <Typography>{amount.total.toFixed(2)}</Typography>
              </Details>
            ))}
          </React.Fragment>
        )}
      </WidgetWrapper>
    );
  }
}

export default CategoryWise;
