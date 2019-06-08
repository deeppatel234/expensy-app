import React, { useEffect, useState } from "react";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";

import Typography from "Components/Typography";
import TypographyCurrency from "Components/Typography/Currency";
import Loader from "Components/Loader";
import Avatar from "Components/Avatar";

import { fixedAmount } from "Utils/utility";
import Models from "Models";
import { TRANSACTION_TYPE } from "Models/ExpenseModel";

import {
  WidgetWrapper,
  Details,
  LeftDetails,
  RightDetails,
  WidgetTitle,
  IconWrapper,
  SubDetails,
  RightText
} from "./style";

const TransactionList = ({ categories, wallets }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState({});
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    Models.get("expense")
      .getTransactionList(5)
      .then(transactionList => {
        setList(transactionList);
        setIsLoading(false);
      })
      .catch(() => setIsVisible(false));
  }, []);

  if (_isEmpty(categories) || !isVisible) {
    return false;
  }

  return (
    <WidgetWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <WidgetTitle>
            <Typography type="title">Last 5 Transaction</Typography>
          </WidgetTitle>
          {list.map(transaction => (
            <Details key={transaction._id}>
              <LeftDetails>
                <IconWrapper marginPosition="right">
                  <Avatar.Icon
                    iconKey={categories[transaction.category].icon}
                  />
                </IconWrapper>
                <SubDetails>
                  <Typography>
                    {categories[transaction.category].name}
                  </Typography>
                  <Typography appearance="gray">
                    {transaction.description}
                  </Typography>
                </SubDetails>
              </LeftDetails>
              <RightDetails>
                <SubDetails>
                  <RightText>
                    {TRANSACTION_TYPE.EXPENSE === transaction.type ? (
                      <TypographyCurrency appearance="red">
                        {fixedAmount(transaction.amount)}
                      </TypographyCurrency>
                    ) : (
                      <TypographyCurrency>{fixedAmount(transaction.amount)}</TypographyCurrency>
                    )}
                  </RightText>
                  <Typography appearance="gray">
                    {transaction.dateTime}
                  </Typography>
                </SubDetails>
                <IconWrapper marginPosition="left">
                  <Avatar.Icon iconKey={wallets[transaction.wallet].icon} />
                </IconWrapper>
              </RightDetails>
            </Details>
          ))}
        </React.Fragment>
      )}
    </WidgetWrapper>
  );
};

export default TransactionList;
