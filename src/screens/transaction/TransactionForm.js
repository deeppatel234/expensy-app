import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import _capitalize from "lodash/capitalize";

import { Formik } from "formik";
import * as Yup from "yup";

import { TouchableHighlight, Alert } from "react-native";

import WalletModal from "Screens/wallet/WalletModal";
import CategoryModal from "Screens/category/CategoryModal";

import DatePicker from "Components/DatePicker";
import TextInput from "Components/TextInput";
import Typography from "Components/Typography";
import Radio from "Components/RadioButton";
import Avatar from "Components/Avatar";
import Icon from "Components/Icon";
import Footer from "Components/Footer";

import { TRANSACTION_TYPE } from "Models/ExpenseModel";

import { BLACK } from "Src/theme";

import {
  Content,
  IconInputWrapper,
  RightInput,
  FormSpace,
  BorderBottom
} from "Src/globalStyle";

const CategorySchema = Yup.object().shape({
  type: Yup.string().required("Required"),
  amount: Yup.string()
    .required("Required")
    .test("len", "Amount should be greater than 0", val => {
      return parseFloat(val || 0) > 0;
    }),
  wallet: Yup.string().required("Required"),
  toWallet: Yup.string().when("type", {
    is: "transfer",
    then: Yup.string().required("Required")
  }),
  category: Yup.string().required("Required")
});

const TransactionForm = ({
  categories,
  wallets,
  currency,
  onSubmitForm,
  transactionValues,
  submitIcon
}) => {
  const [walletModal, setWalletModal] = useState({
    visible: false
  });
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const onSelectCategory = useCallback((data, setFieldValue) => {
    setFieldValue("category", data._id);
    setCategoryModalVisible(false);
  }, []);

  const onSelectWallet = useCallback(
    (data, setFieldValue) => {
      setFieldValue(walletModal.field, data._id);
      setWalletModal({ visible: false });
    },
    [walletModal]
  );

  const onChangeType = useCallback(
    (data, onChange) => {
      if (data !== TRANSACTION_TYPE.TRANSFER || Object.keys(wallets).length > 1) {
        onChange(data);
      } else {
        Alert.alert(
          "Warning",
          "You can not transfer money into same wallet. please add two or more wallet to use this feature."
        );
      }
    },
    [wallets]
  );

  const onSubmit = useCallback(values => {
    values.amount = parseFloat(values.amount || 0);
    if (values.type !== TRANSACTION_TYPE.TRANSFER) {
      delete values.toWallet;
    }
    onSubmitForm(values);
  }, []);

  const getCategoryIcon = useCallback(category => {
    return category ? categories[category].icon : "PLACEHOLDER";
  });

  const getWalletIcon = useCallback(wallet => {
    return wallet ? wallets[wallet].icon : "PLACEHOLDER";
  });

  return (
    <Formik
      initialValues={transactionValues}
      onSubmit={onSubmit}
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
                onChange={data => onChangeType(data, handleChange("type"))}
              >
                {Object.keys(TRANSACTION_TYPE).map(type => (
                  <Radio.Button
                    key={type}
                    value={TRANSACTION_TYPE[type]}
                    text={_capitalize(type)}
                    style={{ flexGrow: 1 }}
                  />
                ))}
              </Radio.Group>
            </FormSpace>
            <TouchableHighlight
              onPress={() => setWalletModal({ visible: true, field: "wallet" })}
            >
              <FormSpace>
                <IconInputWrapper center>
                  <Avatar.Icon iconKey={getWalletIcon(values.wallet)} />
                  <RightInput>
                    <Typography>
                      {values.wallet
                        ? wallets[values.wallet].name
                        : values.type === TRANSACTION_TYPE.TRANSFER
                        ? "Select Transfer From Wallet"
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
            {values.type === TRANSACTION_TYPE.TRANSFER && (
              <TouchableHighlight
                onPress={() =>
                  setWalletModal({ visible: true, field: "toWallet" })
                }
              >
                <FormSpace>
                  <IconInputWrapper center>
                    <Avatar.Icon iconKey={getWalletIcon(values.toWallet)} />
                    <RightInput>
                      <Typography>
                        {values.toWallet
                          ? wallets[values.toWallet].name
                          : "Select Transfer To Wallet"}
                      </Typography>
                      {errors.toWallet && (
                        <Typography type="small" appearance="red">
                          {errors.toWallet}
                        </Typography>
                      )}
                    </RightInput>
                  </IconInputWrapper>
                </FormSpace>
              </TouchableHighlight>
            )}
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
            <IconInputWrapper>
              <Avatar.Currency currency={currency} />
              <RightInput>
                <TextInput
                  placeholder="0"
                  onChangeText={handleChange("amount")}
                  onBlur={handleBlur("amount")}
                  value={`${values.amount}`}
                  keyboardType="numeric"
                  error={errors.amount}
                />
              </RightInput>
            </IconInputWrapper>
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
                <Icon type="Octicons" name="calendar" size={18} color={BLACK} />
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
              visible={walletModal.visible}
              onSelect={data => onSelectWallet(data, setFieldValue)}
              onClose={() => setWalletModal({ visible: false })}
            />
            <CategoryModal
              visible={categoryModalVisible}
              onSelect={data => onSelectCategory(data, setFieldValue)}
              onClose={() => setCategoryModalVisible(false)}
            />
          </Content>
          <Footer actionIcon={submitIcon} onActionClick={handleSubmit} />
        </React.Fragment>
      )}
    </Formik>
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

export default connect(mapStateToProps)(TransactionForm);
