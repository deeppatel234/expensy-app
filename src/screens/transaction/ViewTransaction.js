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

import { TRANSACTION_TYPE_COLOR } from "./components/TransactionPanel";
import TransactionForm from "./TransactionForm";

import models from "Models";
import { WHITE, BLACK } from "Src/theme";

import {
  Container,
  Heading,
  Content,
  RightList,
  FormSpace,
  FlexRow,
} from "Src/globalStyle";

const ViewTransaction = ({
  wallets,
  categories,
  currency,
  match: {
    params: { id }
  }
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(false);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    models
      .get("money_transaction")
      .read({ _id: id })
      .then(res => {
        console.tron.log(res[0]);
        setData(res[0]);
        setIsLoading(false);
      });
  }, []);

  const onEditFormClick = () => {
    setEdit(true);
  };

  const onSubmitForm = (values) => {
    console.tron.log('update from view', values);
    setData(values);
    setEdit(false);
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
    )
  }

  return (
    <Container>
      <Heading>
        <Header text="Transaction" />
      </Heading>
      <Content>
        <FormSpace>
          <Badge appearance={TRANSACTION_TYPE_COLOR[data.type]}>
            <Typography type="title" color={WHITE}>
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
            {
              data.toWallet && (
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
              )
            }
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
                type="SimpleLineIcons"
                name="note"
                size={18}
                color={BLACK}
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
              <Icon
                type="Octicons"
                name="calendar"
                size={18}
                color={BLACK}
              />
            </Avatar>
            <RightList>
              <Typography>{data.dateTime}</Typography>
            </RightList>
          </FlexRow>
        </FormSpace>
      </Content>
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
