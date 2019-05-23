import React, { useState, useCallback } from "react";
import { connect } from "react-redux";

import { TouchableHighlight } from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";

import Redux from "Redux/ReduxRegistry";
import Typography from "Components/Typography";
import TextInput from "Components/TextInput";
import Avatar from "Components/Avatar";
import Header from "Components/Header";
import Footer from "Components/Footer";
import Radio from "Components/RadioButton";

import IconModal from "Screens/icon/IconModal";

import CurrencyModal from "Screens/currency/CurrencyModal";
import CurrencyCode from "Utils/CurrencyCode";

import { BLACK } from "Src/theme";
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
  currency: "INDIAN_RUPEE",
  type: "bank",
  balance: ""
};

const CreateWallet = ({ createWallet, history }) => {
  const [iconModalVisible, setIconModalVisible] = useState(false);
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);

  const onSelectIcon = useCallback((data, setFieldValue) => {
    setFieldValue("icon", data);
    setIconModalVisible(false);
  }, []);

  const onSelectCurrency = useCallback((data, setFieldValue) => {
    setFieldValue("currency", data);
    setCurrencyModalVisible(false);
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
                <TouchableHighlight
                  onPress={() => setCurrencyModalVisible(true)}
                >
                  <Avatar>
                    <Typography color={BLACK}>
                      {CurrencyCode[values.currency].unicode}
                    </Typography>
                  </Avatar>
                </TouchableHighlight>
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
              <CurrencyModal
                visible={currencyModalVisible}
                onSelect={data => onSelectCurrency(data, setFieldValue)}
                onClose={() => setCurrencyModalVisible(false)}
              />
            </Content>
            <Footer>
              <Footer.AddButton onPress={handleSubmit} />
            </Footer>
          </React.Fragment>
        )}
      </Formik>
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
