import React from "react";
import { connect } from "react-redux";

import { Button, TextInput, View } from "react-native";
import { Formik } from "formik";

import Redux from "../../redux/ReduxRegistry";


const CreateWallet = ({ createWallet, history }) => (
  <View>
    <Formik
      initialValues={{ name: "axis", icon: "axis", type: "bank", balance: "123.3" }}
      onSubmit={values => {
        values.balance = parseFloat(values.balance);
        createWallet(values).then(() => history.goBack())
      }}
    >
      {props => (
        <View>
          <TextInput
            onChangeText={props.handleChange("icon")}
            onBlur={props.handleBlur("icon")}
            value={props.values.icon}
          />
          <TextInput
            onChangeText={props.handleChange("name")}
            onBlur={props.handleBlur("name")}
            value={props.values.name}
          />
          <TextInput
            onChangeText={props.handleChange("type")}
            onBlur={props.handleBlur("type")}
            value={props.values.type}
          />
          <TextInput
            onChangeText={props.handleChange("balance")}
            onBlur={props.handleBlur("balance")}
            value={props.values.balance}
            keyboardType="numeric"
          />
          <Button onPress={props.handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  </View>
);


const mapDispatchToProps = dispatch => {
  return {
    createWallet: wallet => dispatch(Redux.get("wallet", "create")(wallet))
  };
};

export default connect(null, mapDispatchToProps)(CreateWallet);
