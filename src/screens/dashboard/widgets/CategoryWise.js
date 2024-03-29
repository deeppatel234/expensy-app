import React, { useEffect, useState } from "react";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";

import Typography from "Components/Typography";
import TypographyCurrency from "Components/Typography/Currency";
import Loader from "Components/Loader";
import Avatar from "Components/Avatar";

import { fixedAmount } from "Utils/utility";
import Models from "Models";

import {
  WidgetWrapper,
  Details,
  LeftDetails,
  WidgetTitle,
  IconWrapper
} from "./style";

const CategoryWise = ({ type, categories }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [amounts, setAmount] = useState({});
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    Models.get("money_transaction")
      .getAmountByCategory(type)
      .then(amount => {
        setAmount(amount);
        setIsLoading(false);
      })
      .catch(() => setIsVisible(false));
  }, []);

  if (_isEmpty(categories) || !isVisible || _isEmpty(amounts)) {
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
              <TypographyCurrency>{fixedAmount(amount.total)}</TypographyCurrency>
            </Details>
          ))}
        </React.Fragment>
      )}
    </WidgetWrapper>
  );
};

export default CategoryWise;
