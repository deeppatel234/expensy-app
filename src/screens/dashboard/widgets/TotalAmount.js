import React, { useEffect, useState } from "react";

import Typography from "Components/Typography";
import TypographyCurrency from "Components/Typography/Currency";
import Loader from "Components/Loader";

import Models from "Models";
import { fixedAmount } from "Utils/utility";

import { WidgetWrapper, Details, Line, WidgetTitle } from "./style";

const TotalAmount = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [amounts, setAmount] = useState({});
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    Models.get("expense")
      .getTotalAmount()
      .then(totalAmount => {
        setAmount(totalAmount);
        setIsLoading(false);
      })
      .catch(() => setIsVisible(false));
  }, []);

  if (!isVisible) {
    return false;
  }

  return (
    <WidgetWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <WidgetTitle>
            <Typography type="title">Overview</Typography>
          </WidgetTitle>
          <Details>
            <Typography>Total Income</Typography>
            <TypographyCurrency>{fixedAmount(amounts.income)}</TypographyCurrency>
          </Details>
          <Details>
            <Typography>Total Expense</Typography>
            <TypographyCurrency appearance="red">
              - {fixedAmount(amounts.expense)}
            </TypographyCurrency>
          </Details>
          <Line />
          <Details>
            <Typography>Total Amount</Typography>
            <TypographyCurrency>
              {fixedAmount(amounts.income - amounts.expense)}
            </TypographyCurrency>
          </Details>
        </React.Fragment>
      )}
    </WidgetWrapper>
  );
};

export default TotalAmount;
