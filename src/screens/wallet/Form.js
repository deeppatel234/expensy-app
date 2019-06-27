import React, { useState, useCallback } from "react";
import { connect } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "Components/TextInput";
import Avatar from "Components/Avatar";
import Footer from "Components/Footer";
import Radio from "Components/RadioButton";

import IconModal from "Screens/icon/IconModal";

import { WALLET_TYPES } from "Models/WalletModel";

import {
  Content,
  IconInputWrapper,
  RightInput,
  FormSpace,
  FlexRow
} from "Src/globalStyle";

const WalletSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  initialBalance: Yup.number().default(0),
  balance: Yup.number().default(0)
});

const Form = ({ mode, wallet, currency, onSubmitForm, actionIcon }) => {
  const [iconModalVisible, setIconModalVisible] = useState(false);

  const onSelectIcon = useCallback((data, setFieldValue) => {
    setFieldValue("icon", data);
    setIconModalVisible(false);
  }, []);

  return (
    <Formik
      initialValues={wallet}
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
                <FlexRow>
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
                </FlexRow>
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
            {mode === "create" && (
              <IconInputWrapper>
                <Avatar.Currency currency={currency} />
                <RightInput>
                  <TextInput
                    placeholder="Initial Balance"
                    onChangeText={handleChange("initialBalance")}
                    onBlur={handleBlur("initialBalance")}
                    value={values.initialBalance}
                    keyboardType="numeric"
                    error={errors.initialBalance}
                  />
                </RightInput>
              </IconInputWrapper>
            )}
            <IconModal
              visible={iconModalVisible}
              onSelect={data => onSelectIcon(data, setFieldValue)}
              onClose={() => setIconModalVisible(false)}
            />
          </Content>
          <Footer actionIcon={actionIcon} onActionClick={handleSubmit} />
        </React.Fragment>
      )}
    </Formik>
  );
};

// Maps state from store to props
const mapStateToProps = state => {
  return {
    currency: state.setting.currency
  };
};

export default connect(
  mapStateToProps,
  null
)(Form);
