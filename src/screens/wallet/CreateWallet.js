import React, { Component } from "react";
import { connect } from "react-redux";

import { TouchableHighlight } from "react-native";

import { Formik } from "formik";
import * as Yup from 'yup';

import Redux from "Redux/ReduxRegistry";
import TypoGraphy from "Components/TypoGraphy";
import TextInput from "Components/TextInput";
import Avatar from "Components/Avatar";
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import Radio from "Components/RadioButton";

import IconModal from "Screens/icon/IconModal";

import CurrencyModal from "Screens/currency/CurrencyModal";
import CurrencyCode from 'Utils/CurrencyCode';

import { BLACK } from 'Src/theme';
import { WALLET_TYPES } from 'Models/WalletModel';

import {
  Container,
  Heading,
  Content,
  IconInputWrapper,
  LeftIcon,
  RightInput,
  FormSpace,
} from "Src/globalStyle";

const WalletSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  balance: Yup.number().default(0),
});

class CreateWallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iconModalVisible: false,
      currencyModalVisible: false,
    };

    this.onSelectIcon = this.onSelectIcon.bind(this);
    this.showIconModal = this.showIconModal.bind(this);
    this.closeIconModal = this.closeIconModal.bind(this);
    this.onSelectCurrency = this.onSelectCurrency.bind(this);
    this.showCurrencyModal = this.showCurrencyModal.bind(this);
    this.closeCurrencyModal = this.closeCurrencyModal.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm(values) {
    const { createWallet, history } = this.props;
    values.balance = parseFloat(values.balance || 0);
    createWallet(values).then(() => history.goBack());
  }

  showIconModal() {
    this.setState({ iconModalVisible: true });
  }

  closeIconModal() {
    this.setState({ iconModalVisible: false });
  }

  onSelectIcon(data, props) {
    props.setFieldValue("icon", data);
    this.setState({ iconModalVisible: false });
  }

  showCurrencyModal() {
    this.setState({ currencyModalVisible: true });
  }

  closeCurrencyModal() {
    this.setState({ currencyModalVisible: false });
  }

  onSelectCurrency(data, props) {
    props.setFieldValue("currency", data);
    this.setState({ currencyModalVisible: false });
  }

  render() {
    const { iconModalVisible, currencyModalVisible } = this.state;

    return (
      <Container>
        <Heading>
          <Header text="Add Wallet" />
        </Heading>
        <Formik
          initialValues={{ icon: "PLACEHOLDER", currency: "INDIAN_RUPEE", type: "bank", balance: "0" }}
          onSubmit={this.onSubmitForm}
          validationSchema={WalletSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {props => (
            <React.Fragment>
              <Content>
                <FormSpace>
                  <Radio.Group selectedValue={props.values.type} onChange={props.handleChange("type")}>
                    <Radio.Button value={WALLET_TYPES.BANK} text="Bank" style={{ flexGrow: 1 }} />
                    <Radio.Button value={WALLET_TYPES.CASH} text="Cash" style={{ flexGrow: 1 }} />
                  </Radio.Group>
                </FormSpace>
                <IconInputWrapper>
                  <LeftIcon>
                    <TouchableHighlight onPress={this.showIconModal}>
                      <Avatar.Icon iconKey={props.values.icon} />
                    </TouchableHighlight>
                  </LeftIcon>
                  <RightInput>
                    <TextInput
                      placeholder="Wallet Name"
                      onChangeText={props.handleChange("name")}
                      onBlur={props.handleBlur("name")}
                      value={props.values.name}
                      error={props.errors.name}
                    />
                  </RightInput>
                </IconInputWrapper>
                <IconInputWrapper>
                  <LeftIcon>
                    <TouchableHighlight onPress={this.showCurrencyModal}>
                      <Avatar>
                        <TypoGraphy color={BLACK}>{CurrencyCode[props.values.currency].unicode}</TypoGraphy>
                      </Avatar>
                    </TouchableHighlight>
                  </LeftIcon>
                  <RightInput>
                    <TextInput
                      placeholder="Initial Balance"
                      onChangeText={props.handleChange("balance")}
                      onBlur={props.handleBlur("balance")}
                      value={props.values.balance}
                      keyboardType="numeric"
                      error={props.errors.balance}
                    />
                  </RightInput>
                </IconInputWrapper>
                <IconModal
                  visible={iconModalVisible}
                  onSelect={data => this.onSelectIcon(data, props)}
                  onClose={this.closeIconModal}
                />
                <CurrencyModal
                  visible={currencyModalVisible}
                  onSelect={data => this.onSelectCurrency(data, props)}
                  onClose={this.closeCurrencyModal}
                />
              </Content>
              <Footer>
                <Footer.AddButton onPress={props.handleSubmit} />
              </Footer>
            </React.Fragment>
          )}
        </Formik>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createWallet: wallet => dispatch(Redux.get("wallet", "create")(wallet))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateWallet);
