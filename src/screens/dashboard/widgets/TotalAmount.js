import React, { useEffect, useState } from "react";

import Typography from "Components/Typography";
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
            <Typography>{fixedAmount(amounts.income)}</Typography>
          </Details>
          <Details>
            <Typography>Total Expense</Typography>
            <Typography appearance="red">
              - {fixedAmount(amounts.expense)}
            </Typography>
          </Details>
          <Line />
          <Details>
            <Typography>Total Amount</Typography>
            <Typography>
              {fixedAmount(amounts.income - amounts.expense)}
            </Typography>
          </Details>
        </React.Fragment>
      )}
    </WidgetWrapper>
  );
};

export default TotalAmount;
