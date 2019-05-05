import React from "react";
import { connect } from "react-redux";

import { Formik } from "formik";

import Redux from "../../redux/ReduxRegistry";
import TypoGraphy from "../../components/TypoGraphy";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

import { Container, Heading, Content } from "../../../globalStyle";

const CreateWallet = ({ createWallet, history }) => (
  <Container>
    <Heading>
      <TypoGraphy type="heading" appearance="primary">
        Add Wallet
      </TypoGraphy>
    </Heading>
    <Content>
      <Formik
        onSubmit={values => {
          values.balance = parseFloat(values.balance);
          createWallet(values).then(() => history.goBack());
        }}
      >
        {props => (
          <React.Fragment>
            <TextInput
              placeholder="Select Icon"
              onChangeText={props.handleChange("icon")}
              onBlur={props.handleBlur("icon")}
              value={props.values.icon}
            />
            <TextInput
              placeholder="Wallet Type"
              onChangeText={props.handleChange("type")}
              onBlur={props.handleBlur("type")}
              value={props.values.type}
            />
            <TextInput
              placeholder="Wallet Name"
              onChangeText={props.handleChange("name")}
              onBlur={props.handleBlur("name")}
              value={props.values.name}
            />
            <TextInput
              placeholder="Initial Balance"
              onChangeText={props.handleChange("balance")}
              onBlur={props.handleBlur("balance")}
              value={props.values.balance}
              keyboardType="numeric"
            />
            <Button onPress={props.handleSubmit} text="Add" appearance="primary" />
          </React.Fragment>
        )}
      </Formik>
    </Content>
  </Container>
);

const mapDispatchToProps = dispatch => {
  return {
    createWallet: wallet => dispatch(Redux.get("wallet", "create")(wallet))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateWallet);
