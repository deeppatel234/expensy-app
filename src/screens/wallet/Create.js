import React from "react";
import { connect } from "react-redux";

import Redux from "Redux/ReduxRegistry";
import Header from "Components/Header";
import WalletForm from "./Form";

import { Container, Heading } from "Src/globalStyle";

const INITIAL_WALLET_VALUES = {
  icon: "PLACEHOLDER",
  type: "bank",
  initialBalance: ""
};

const CreateWallet = ({ createWallet, history }) => {
  const onSubmitForm = values => {
    values.initialBalance = parseFloat(values.initialBalance || 0);
    values.balance = values.initialBalance;
    createWallet(values).then(() => history.goBack());
  };

  return (
    <Container>
      <Heading>
        <Header text="Add Wallet" />
      </Heading>
      <WalletForm
        actionIcon="add"
        mode="create"
        wallet={INITIAL_WALLET_VALUES}
        onSubmitForm={onSubmitForm}
      />
    </Container>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createWallet: wallet => dispatch(Redux.get("wallet", "create")(wallet))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateWallet);
