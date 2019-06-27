import React from "react";
import { connect } from "react-redux";

import Redux from "Redux/ReduxRegistry";
import Header from "Components/Header";
import WalletForm from "./Form";

import {
  Container,
  Heading,
} from "Src/globalStyle";

const EditWallet = ({ updateWallet, wallet, history }) => {

  const onSubmitForm = (values) => {
    delete values.initialBalance;
    delete values.balance;
    updateWallet(values).then(() => history.goBack());
  };

  return (
    <Container>
      <Heading>
        <Header text="Wallet" />
      </Heading>
      <WalletForm
        actionIcon="save"
        wallet={wallet}
        onSubmitForm={onSubmitForm}
      />
    </Container>
  );
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  return {
    wallet: state.wallets[id]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateWallet: wallet =>
      dispatch(Redux.get("wallet", "update")(wallet))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditWallet);
