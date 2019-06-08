import React from "react";
import _groupBy from "lodash/groupBy";

import Typography from "Components/Typography";
import TypographyCurrency from "Components/Typography/Currency";

import { fixedAmount } from "Utils/utility";

import { Wrapper, Details, Line } from "./styled";

const TotalOverview = ({ list }) => {
  const { income = [], expense = [] } = _groupBy(list, "type");
  const totalIncome = income.reduce((total, { amount }) => total + amount, 0);
  const totalExpense = expense.reduce((total, { amount }) => total + amount, 0);

  return (
    <Wrapper>
      <Details>
        <Typography>Total Income</Typography>
        <TypographyCurrency>{fixedAmount(totalIncome)}</TypographyCurrency>
      </Details>
      <Details>
        <Typography>Total Expense</Typography>
        <TypographyCurrency appearance="red">
          - {fixedAmount(totalExpense)}
        </TypographyCurrency>
      </Details>
      <Line />
      <Details>
        <Typography>Total Amount</Typography>
        <TypographyCurrency>
          {fixedAmount(totalIncome - totalExpense)}
        </TypographyCurrency>
      </Details>
    </Wrapper>
  );
};

export default TotalOverview;
