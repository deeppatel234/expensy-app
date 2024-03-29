import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _capitalize from "lodash/capitalize";

import Typography from "Components/Typography";
import Avatar from "Components/Avatar";
import Icon from "Components/Icon";
import Badge from "Components/Badge";
import Header from "Components/Header";
import Footer from "Components/Footer";
import Loader from "Components/Loader";
import Button from "Components/Button";

import { TRANSACTION_TYPE_COLOR } from "./components/TransactionPanel";
import TransactionForm from "./TransactionForm";

import models from "Models";

import {
  Container,
  Heading,
  Content,
  RightList,
  FormSpace,
  FlexRow,
  FooterActionButtons
} from "Src/globalStyle";

const ViewTransaction = ({
  wallets,
  categories,
  currency,
  match: {
    params: { id }
  },
  history,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(false);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    models
      .get("money_transaction")
      .read({ _id: id })
      .then(res => {
        setData(res[0]);
        setIsLoading(false);
      });
  }, []);

  const onEditFormClick = () => {
    setEdit(true);
  };

  const onDeleteClick = () => {
    models
      .get("money_transaction")
      .delete(data)
      .then(() => {
        history.goBack();
      });
  }

  const onSubmitForm = values => {
    models
      .get("money_transaction")
      .update(values, { _id: id }, data)
      .then(res => {
        setData(values);
        setEdit(false);
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isEdit) {
    return (
      <Container>
        <Heading>
          <Header text="Transaction" />
        </Heading>
        <TransactionForm
          transactionValues={data}
          submitIcon="save"
          onSubmitForm={onSubmitForm}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Heading>
        <Header text="Transaction" />
      </Heading>
      <Content>
        <FormSpace>
          <Badge appearance={TRANSACTION_TYPE_COLOR[data.type]}>
            <Typography type="title" color="white">
              {data.type}
            </Typography>
          </Badge>
        </FormSpace>
        <FormSpace>
          <FlexRow>
            <Avatar.Icon iconKey={wallets[data.wallet].icon} />
            <RightList>
              <Typography>{wallets[data.wallet].name}</Typography>
            </RightList>
            {data.toWallet && (
              <React.Fragment>
                <RightList>
                  <Icon iconType="AntDesign" icon="arrowright" />
                </RightList>
                <RightList>
                  <FlexRow>
                    <Avatar.Icon iconKey={wallets[data.toWallet].icon} />
                    <RightList>
                      <Typography>{wallets[data.toWallet].name}</Typography>
                    </RightList>
                  </FlexRow>
                </RightList>
              </React.Fragment>
            )}
          </FlexRow>
        </FormSpace>
        <FormSpace>
          <FlexRow>
            <Avatar.Icon iconKey={categories[data.category].icon} />
            <RightList>
              <Typography>{categories[data.category].name}</Typography>
            </RightList>
          </FlexRow>
        </FormSpace>
        <FormSpace>
          <FlexRow>
            <Avatar.Currency currency={currency} />
            <RightList>
              <Typography>{data.amount}</Typography>
            </RightList>
          </FlexRow>
        </FormSpace>
        <FormSpace>
          <FlexRow>
            <Avatar>
              <Icon
                iconType="SimpleLineIcons"
                icon="note"
                size={18}
                color="black"
              />
            </Avatar>
            <RightList>
              <Typography>{data.description}</Typography>
            </RightList>
          </FlexRow>
        </FormSpace>
        <FormSpace>
          <FlexRow>
            <Avatar>
              <Icon iconType="Octicons" icon="calendar" size={18} color="black" />
            </Avatar>
            <RightList>
              <Typography>{data.dateTime}</Typography>
            </RightList>
          </FlexRow>
        </FormSpace>
      </Content>
      <FooterActionButtons>
        <Button
          text="delete"
          borderRadius
          appearance="red"
          onPress={onDeleteClick}
        />
      </FooterActionButtons>
      <Footer actionIcon="edit" onActionClick={onEditFormClick} />
    </Container>
  );
};

// Maps state from store to props
const mapStateToProps = state => {
  return {
    wallets: state.wallets,
    categories: state.categories,
    currency: state.setting.currency
  };
};

export default connect(mapStateToProps)(ViewTransaction);
