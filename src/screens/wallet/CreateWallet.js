import React, { Component } from "react";
import { connect } from "react-redux";

import { TouchableHighlight } from "react-native";

import { Formik } from "formik";

import Redux from "Redux/ReduxRegistry";
import TypoGraphy from "Components/TypoGraphy";
import Button from "Components/Button";
import TextInput from "Components/TextInput";
import Avatar from "Components/Avatar";
import Icon from "Components/Icon";
import DropDown from "Components/DropDown";
import Header from 'Components/Header';

import IconModel from "Screens/icon/IconModel";
import IconList from 'Utils/IconList';

import CurrencyModel from "Screens/currency/CurrencyModel";
import CurrencyCode from 'Utils/CurrencyCode';

import {
  Container,
  Heading,
  Content,
  Footer,
  FooterButton,
  IconInputWrapper,
  LeftIcon,
  RightInput
} from "Src/globalStyle";

class CreateWallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iconModelVisible: false,
      currencyModelVisible: false,
    };

    this.onSelectIcon = this.onSelectIcon.bind(this);
    this.showIconModel = this.showIconModel.bind(this);
    this.onSelectCurrency = this.onSelectCurrency.bind(this);
    this.showCurrencyModel = this.showCurrencyModel.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm(values) {
    const { createWallet, history } = this.props;
    values.balance = parseFloat(values.balance);
    createWallet(values).then(() => history.goBack());
  }

  showIconModel() {
    this.setState({ iconModelVisible: true });
  }

  onSelectIcon(data, props) {
    props.setFieldValue("icon", data);
    this.setState({ iconModelVisible: false });
  }

  showCurrencyModel() {
    this.setState({ currencyModelVisible: true });
  }

  onSelectCurrency(data, props) {
    props.setFieldValue("currency", data);
    this.setState({ currencyModelVisible: false });
  }

  render() {
    const { iconModelVisible, currencyModelVisible } = this.state;

    return (
      <Container>
        <Heading>
          <Header text="Add Wallet" />
        </Heading>
        <Formik
          initialValues={{ icon: "PLACEHOLDER", currency: "INDIAN_RUPEE", type: "bank", balance: "0" }}
          onSubmit={this.onSubmitForm}
        >
          {props => (
            <React.Fragment>
              <Content>
                <IconInputWrapper>
                  <LeftIcon>
                    <TouchableHighlight onPress={this.showIconModel}>
                      <Avatar>
                        <Icon
                          type={IconList[props.values.icon].type}
                          name={IconList[props.values.icon].name}
                        />
                      </Avatar>
                    </TouchableHighlight>
                  </LeftIcon>
                  <RightInput>
                    <TextInput
                      placeholder="Wallet Name"
                      onChangeText={props.handleChange("name")}
                      onBlur={props.handleBlur("name")}
                      value={props.values.name}
                    />
                  </RightInput>
                </IconInputWrapper>
                <DropDown
                  selectedValue={props.values.type}
                  options={[{ value: 'bank', text: 'Bank' }, { value: 'cash', text: 'Cash' }]}
                  onValueChange={props.handleChange("type")}
                />
                <IconInputWrapper>
                  <LeftIcon>
                    <TouchableHighlight onPress={this.showCurrencyModel}>
                      <Avatar>
                        <TypoGraphy>{CurrencyCode[props.values.currency].unicode}</TypoGraphy>
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
                    />
                  </RightInput>
                </IconInputWrapper>
                <IconModel
                  visible={iconModelVisible}
                  onSelect={data => this.onSelectIcon(data, props)}
                />
                <CurrencyModel
                  visible={currencyModelVisible}
                  onSelect={data => this.onSelectCurrency(data, props)}
                />
              </Content>
              <Footer>
                <FooterButton>
                  <Button
                    rounded
                    onPress={props.handleSubmit}
                    text="Add"
                    appearance="primary"
                  />
                </FooterButton>
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
