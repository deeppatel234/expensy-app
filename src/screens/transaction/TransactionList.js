import React, { useEffect, useState } from 'React';
import { connect } from "react-redux";

import Footer from "Components/Footer";
import Header from "Components/Header";
import Typography from "Components/Typography";
import Avatar from "Components/Avatar";
import Badge from "Components/Badge";
import Loader from "Components/Loader";
import Icon from "Components/Icon";
import TypographyCurrency from "Components/Typography/Currency";

import { Container, Heading, Content } from "Src/globalStyle";
import models from "Models";
import { EXPENSE_TYPES } from "Models/ExpenseModel";
import { fixedAmount } from "Utils/utility";

import {
  TransactionWrapper,
  CardHeader,
  CardContent,
  FlexRow,
  SubDetails,
  AmountText,
  TransferIcon,
} from './styled';

const EXPENSE_COLOR = {
  [EXPENSE_TYPES.INCOME]: "green",
  [EXPENSE_TYPES.EXPENSE]: "red",
  [EXPENSE_TYPES.TRANSFER]: "teal"
};

const TransactionList = ({ wallets, categories }) => {
  const [transactionList, setTransactionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    models
    .get("expense")
    .readAll()
    .then((list) => {
      console.tron.log(list);
      setTransactionList(list);
      setIsLoading(false);
    });
  }, []);

  const onFilterShowClick = () => {

  };

  return (
    <Container>
      <Heading>
        <Header text="Transactions" />
      </Heading>
      <Content>
        {
          isLoading && <Loader />
        }
        {
          !isLoading && transactionList.map(({
            _id,
            type,
            wallet,
            toWallet,
            category,
            description,
            dateTime,
            amount,
          }) => (
            <TransactionWrapper key={_id}>
              <CardHeader>
                <Badge appearance={EXPENSE_COLOR[type]}>
                  <Typography appearance="white" size={10}>{type}</Typography>
                </Badge>
                <Badge appearance="primary">
                  <Typography appearance="white" size={10}>{wallets[wallet].type}</Typography>
                </Badge>
              </CardHeader>
              <CardContent>
                <FlexRow>
                  <Avatar.Icon
                    iconKey={categories[category].icon}
                  />
                  <SubDetails type="left">
                    <Typography>
                      {categories[category].name}
                    </Typography>
                    <Typography appearance="gray">
                      {description}
                    </Typography>
                  </SubDetails>
                </FlexRow>
                <FlexRow>
                  <SubDetails type="right">
                    <AmountText>
                      <TypographyCurrency appearance={EXPENSE_TYPES.EXPENSE === type ? 'red' : 'black'}>
                        {fixedAmount(amount)}
                      </TypographyCurrency>
                    </AmountText>
                    <Typography appearance="gray">
                      {dateTime}
                    </Typography>
                  </SubDetails>
                  <Avatar.Icon iconKey={wallets[wallet].icon} />
                  {
                    EXPENSE_TYPES.TRANSFER === type && (
                      <React.Fragment>
                        <TransferIcon>
                          <Icon iconType="AntDesign" icon="arrowright" />
                        </TransferIcon>
                        <Avatar.Icon iconKey={wallets[toWallet].icon} />
                      </React.Fragment>
                    )
                  }
                </FlexRow>
              </CardContent>
            </TransactionWrapper>
          ))
        }
      </Content>
      <Footer iconType="AntDesign" actionIcon="filter" onActionClick={onFilterShowClick} />
    </Container>
  );
};

// Maps state from store to props
const mapStateToProps = state => {
  return {
    categories: state.categories,
    wallets: state.wallets,
  };
};

export default connect(
  mapStateToProps,
  null,
)(TransactionList);
