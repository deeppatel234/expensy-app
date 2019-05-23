import React, { useState, useCallback } from "react";
import { connect } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";

import { TouchableHighlight } from "react-native";

import formatDate from "date-fns/format";

import WalletModal from "Screens/wallet/WalletModal";
import CategoryModal from "Screens/category/CategoryModal";

import DatePicker from "Components/DatePicker";
import TextInput from "Components/TextInput";
import Typography from "Components/Typography";
import Radio from "Components/RadioButton";
import Avatar from "Components/Avatar";
import Icon from "Components/Icon";
import Header from "Components/Header";
import Footer from "Components/Footer";

import CurrencyCode from "Utils/CurrencyCode";

import { EXPENSE_TYPES } from "Models/ExpenseModel";

import { BLACK } from "Src/theme";

import {
  Container,
  Heading,
  Content,
  IconInputWrapper,
  RightInput,
  FormSpace,
  BorderBottom
} from "Src/globalStyle";

import models from "../../sql/models";

const CategorySchema = Yup.object().shape({
  amount: Yup.string()
    .required("Required")
    .test("len", "Amount should be greater than 0", val => {
      return parseFloat(val || 0) > 0;
    }),
  wallet: Yup.string().required("Required"),
  category: Yup.string().required("Required")
});

const CreateExpense = ({ history, categories, wallets }) => {
  const [walletModalVisible, setWalletModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const onSelectCategory = useCallback((data, setFieldValue) => {
    setFieldValue("category", data._id);
    setCategoryModalVisible(false);
  }, []);

  const onSelectWallet = useCallback((data, setFieldValue) => {
    setFieldValue("wallet", data._id);
    setWalletModalVisible(false);
  }, []);

  const onSubmitForm = useCallback(values => {
    values.amount = parseFloat(values.amount || 0);
    models
      .get("expense")
      .create(values, true)
      .then(() => {
        history.goBack();
      });
  }, []);

  const getCategoryIcon = useCallback(category => {
    return category ? categories[category].icon : "PLACEHOLDER";
  });

  const getWalletIcon = useCallback(wallet => {
    return wallet ? wallets[wallet].icon : "PLACEHOLDER";
  });

  const getCurrencyCode = useCallback(wallet => {
    return CurrencyCode[wallets[wallet].currency].unicode;
  });

  return (
    <Container>
      <Heading>
        <Header text="Add Transaction" />
      </Heading>
      <Formik
        initialValues={{
          type: "expense",
          amount: "0",
          dateTime: formatDate(new Date(), "DD/MM/YYYY")
        }}
        onSubmit={onSubmitForm}
        validationSchema={CategorySchema}
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
                    value={EXPENSE_TYPES.EXPENSE}
                    text="Expense"
                    style={{ flexGrow: 1 }}
                  />
                  <Radio.Button
                    value={EXPENSE_TYPES.INCOME}
                    text="Incomes"
                    style={{ flexGrow: 1 }}
                  />
                </Radio.Group>
              </FormSpace>
              <TouchableHighlight onPress={() => setWalletModalVisible(true)}>
                <FormSpace>
                  <IconInputWrapper center>
                    <Avatar.Icon iconKey={getWalletIcon(values.wallet)} />
                    <RightInput>
                      <Typography>
                        {values.wallet
                          ? wallets[values.wallet].name
                          : "Select Wallet"}
                      </Typography>
                      {errors.wallet && (
                        <Typography type="small" appearance="red">
                          {errors.wallet}
                        </Typography>
                      )}
                    </RightInput>
                  </IconInputWrapper>
                </FormSpace>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => setCategoryModalVisible(true)}>
                <FormSpace>
                  <IconInputWrapper center>
                    <Avatar.Icon iconKey={getCategoryIcon(values.category)} />
                    <RightInput>
                      <Typography>
                        {values.category
                          ? categories[values.category].name
                          : "Select Category"}
                      </Typography>
                      {errors.category && (
                        <Typography type="small" appearance="red">
                          {errors.category}
                        </Typography>
                      )}
                    </RightInput>
                  </IconInputWrapper>
                </FormSpace>
              </TouchableHighlight>
              {values.wallet && (
                <IconInputWrapper>
                  <Avatar>
                    <Typography color={BLACK}>
                      {getCurrencyCode(values.wallet)}
                    </Typography>
                  </Avatar>
                  <RightInput>
                    <TextInput
                      onChangeText={handleChange("amount")}
                      onBlur={handleBlur("amount")}
                      value={values.amount}
                      keyboardType="numeric"
                      error={errors.amount}
                    />
                  </RightInput>
                </IconInputWrapper>
              )}
              <IconInputWrapper>
                <Avatar>
                  <Icon
                    type="SimpleLineIcons"
                    name="note"
                    size={18}
                    color={BLACK}
                  />
                </Avatar>
                <RightInput>
                  <TextInput
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                    placeholder="Write some note..."
                  />
                </RightInput>
              </IconInputWrapper>
              <IconInputWrapper>
                <Avatar>
                  <Icon
                    type="Octicons"
                    name="calendar"
                    size={18}
                    color={BLACK}
                  />
                </Avatar>
                <RightInput>
                  <BorderBottom>
                    <DatePicker
                      date={values.dateTime}
                      onDateChange={handleChange("dateTime")}
                    />
                  </BorderBottom>
                </RightInput>
              </IconInputWrapper>
              <WalletModal
                visible={walletModalVisible}
                onSelect={data => onSelectWallet(data, setFieldValue)}
                onClose={() => setWalletModalVisible(false)}
              />
              <CategoryModal
                visible={categoryModalVisible}
                onSelect={data => onSelectCategory(data, setFieldValue)}
                onClose={() => setCategoryModalVisible(false)}
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

// Maps state from store to props
const mapStateToProps = state => {
  return {
    wallets: state.wallets,
    categories: state.categories
  };
};

export default connect(mapStateToProps)(CreateExpense);
