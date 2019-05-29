import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import Redux from "Redux/ReduxRegistry";
import Header from "Components/Header";
import TextInput from "Components/TextInput";
import Avatar from "Components/Avatar";
import Footer from "Components/Footer";
import Radio from "Components/RadioButton";

import IconModal from "Screens/icon/IconModal";
import WalletPanel from "./components/WalletPanel";

import { WALLET_TYPES } from "Models/WalletModel";

import {
  Container,
  Heading,
  Content,
  IconInputWrapper,
  RightInput,
  FormSpace,
} from "Src/globalStyle";

const WalletSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  balance: Yup.number().default(0)
});

const EditForm = ({ wallet, onSubmitForm }) => {
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
            <IconModal
              visible={iconModalVisible}
              onSelect={data => onSelectIcon(data, setFieldValue)}
              onClose={() => setIconModalVisible(false)}
            />
          </Content>
          <Footer>
            <Footer.SaveButton onPress={handleSubmit} />
          </Footer>
        </React.Fragment>
      )}
    </Formik>
  );
};

const EditWallet = ({ updateWallet, wallet }) => {
  const [editMode, setEditMode] = useState(false);

  const onSubmitForm = useCallback(values => {
    updateWallet(values).then(() => setEditMode(false));
  }, []);

  return (
    <Container>
      <Heading>
        <Header text="Wallet" />
      </Heading>
      {editMode && <EditForm wallet={wallet} onSubmitForm={onSubmitForm} />}
      {!editMode && (
        <React.Fragment>
          <Content>
            <WalletPanel wallet={wallet} />
          </Content>
          <Footer>
            <Footer.EditButton onPress={() => setEditMode(true)} />
          </Footer>
        </React.Fragment>
      )}
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
