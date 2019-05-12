import React, { Component } from "react";
import { connect } from "react-redux";
import _capitalize from "lodash/capitalize";

import TypoGraphy from "Components/TypoGraphy";
import Loader from "Components/Loader";
import Avatar from "Components/Avatar";
import Icon from "Components/Icon";

import Models from "Models";
import IconList from "Utils/IconList";

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
        console.tron.log(amounts);
        this.setState({ amounts, isLoading: false });
      })
      .catch(error => {
        console.tron.log("error", error);
      });
  }

  render() {
    const { amounts, isLoading } = this.state;
    const { type, categories } = this.props;

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
                  <IconWrapper>
                    <Avatar>
                      <Icon
                        type={IconList[categories[amount.category].icon].type}
                        name={IconList[categories[amount.category].icon].name}
                        size={20}
                      />
                    </Avatar>
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

// Maps state from store to props
const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

export default connect(mapStateToProps)(CategoryWise);
