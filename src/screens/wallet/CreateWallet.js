import React, { useState, useCallback } from "react";
import { connect } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";

import Redux from "Redux/ReduxRegistry";
import TextInput from "Components/TextInput";
import Avatar from "Components/Avatar";
import Header from "Components/Header";
import Footer from "Components/Footer";
import Radio from "Components/RadioButton";

import IconModal from "Screens/icon/IconModal";

import { WALLET_TYPES } from "Models/WalletModel";

import {
  Container,
  Heading,
  Content,
  IconInputWrapper,
  RightInput,
  FormSpace
} from "Src/globalStyle";

const WalletSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  balance: Yup.number().default(0)
});

const INITIAL_WALLET_VALUES = {
  icon: "PLACEHOLDER",
  type: "bank",
  balance: ""
};

const CreateWallet = ({ createWallet, history, currency }) => {
  const [iconModalVisible, setIconModalVisible] = useState(false);

  const onSelectIcon = useCallback((data, setFieldValue) => {
    setFieldValue("icon", data);
    setIconModalVisible(false);
  }, []);

  const onSubmitForm = useCallback(values => {
    values.balance = parseFloat(values.balance || 0);
    createWallet(values).then(() => history.goBack());
  }, []);

  return (
    <Container>
      <Heading>
        <Header text="Add Wallet" />
      </Heading>
      <Formik
        initialValues={INITIAL_WALLET_VALUES}
        onSubmit={onSubmitForm}
        validationSchema={WalletSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          handleSubmit,
          setFieldValue
        }) => (
          <React.Fragment>
            <Content>
              <FormSpace>
                <Radio.Group
                  selectedValue={values.type}
                  onChange={handleChange("type")}
                >
                  <Radio.Button
                    value={WALLET_TYPES.BANK}
                    text="Bank"
                    style={{ flexGrow: 1 }}
                  />
                  <Radio.Button
                    value={WALLET_TYPES.CASH}
                    text="Cash"
                    style={{ flexGrow: 1 }}
                  />
                </Radio.Group>
              </FormSpace>
              <IconInputWrapper>
                <Avatar.Icon
                  iconKey={values.icon}
                  onPress={() => setIconModalVisible(true)}
                />
                <RightInput>
                  <TextInput
                    placeholder="Wallet Name"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    error={errors.name}
                  />
                </RightInput>
              </IconInputWrapper>
              <IconInputWrapper>
                <Avatar.Currency currency={currency} />
                <RightInput>
                  <TextInput
                    placeholder="Initial Balance"
                    onChangeText={handleChange("balance")}
                    onBlur={handleBlur("balance")}
                    value={values.balance}
                    keyboardType="numeric"
                    error={errors.balance}
                  />
                </RightInput>
              </IconInputWrapper>
              <IconModal
                visible={iconModalVisible}
                onSelect={data => onSelectIcon(data, setFieldValue)}
                onClose={() => setIconModalVisible(false)}
              />
            </Content>
            <Footer actionIcon="add" onActionClick={handleSubmit} />
          </React.Fragment>
        )}
      </Formik>
    </Container>
  );
};

// Maps state from store to props
const mapStateToProps = state => {
  return {
    currency: state.setting.currency
  };
};


const mapDispatchToProps = dispatch => {
  return {
    createWallet: wallet => dispatch(Redux.get("wallet", "create")(wallet))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWallet);
