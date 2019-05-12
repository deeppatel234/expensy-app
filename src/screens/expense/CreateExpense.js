import React, { Component } from "react";
import { connect } from "react-redux";

import { Formik } from "formik";
import { TouchableHighlight } from "react-native";

import formatDate from "date-fns/format";

import WalletModel from "Screens/wallet/WalletModel";
import CategoryModel from "Screens/category/CategoryModel";

import DatePicker from "Components/DatePicker";
import TextInput from "Components/TextInput";
import TypoGraphy from "Components/TypoGraphy";
import Button from "Components/Button";
import Radio from "Components/RadioButton";
import Avatar from "Components/Avatar";
import Icon from "Components/Icon";
import Header from 'Components/Header';

import IconList from 'Utils/IconList';
import CurrencyCode from "Utils/CurrencyCode";

import {
  Container,
  Heading,
  Content,
  Footer,
  FooterButton,
  IconInputWrapper,
  LeftIcon,
  RightInput,
  FormSpace,
  BorderBottom
} from "Src/globalStyle";

import models from "../../sql/models";

class CreateExpense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      walletModelVisible: false,
      categoryModelVisible: false
    };

    this.onSelectWallet = this.onSelectWallet.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.showWalletModel = this.showWalletModel.bind(this);
    this.showCategoryModel = this.showCategoryModel.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSelectWallet(data, props) {
    props.setFieldValue("wallet", data._id);
    this.setState({ walletModelVisible: false });
  }

  onSelectCategory(data, props) {
    props.setFieldValue("category", data._id);
    this.setState({ categoryModelVisible: false });
  }

  showWalletModel() {
    this.setState({ walletModelVisible: true });
  }

  showCategoryModel() {
    this.setState({ categoryModelVisible: true });
  }

  onSubmitForm(values) {
    const { history } = this.props;
    values.amount = parseFloat(values.amount);
    models
      .get("expense")
      .create(values, true)
      .then(dbRes => {
        history.goBack();
      });
  }

  getCategoryIcon(category) {
    const { categories } = this.props;
    return category
      ? IconList[categories[category].icon]
      : IconList.PLACEHOLDER;
  }

  getWalletIcon(wallet) {
    const { wallets } = this.props;
    return wallet ? IconList[wallets[wallet].icon] : IconList.PLACEHOLDER;
  }

  getCurrencyCode(wallet) {
    const { wallets } = this.props;
    return CurrencyCode[wallets[wallet].currency].unicode;
  }

  render() {
    const { walletModelVisible, categoryModelVisible } = this.state;
    const { categories, wallets } = this.props;

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
          onSubmit={this.onSubmitForm}
        >
          {props => (
            <React.Fragment>
              <Content>
                <FormSpace>
                  <Radio.Group selectedValue={props.values.type} onChange={props.handleChange("type")}>
                    <Radio.Button value="expense" text="Expense" style={{ flexGrow: 1 }} />
                    <Radio.Button value="income" text="Incomes" style={{ flexGrow: 1 }} />
                  </Radio.Group>
                </FormSpace>
                <TouchableHighlight onPress={this.showWalletModel}>
                  <FormSpace>
                    <IconInputWrapper center>
                      <LeftIcon>
                        <Avatar>
                          <Icon
                            type={this.getWalletIcon(props.values.wallet).type}
                            name={this.getWalletIcon(props.values.wallet).name}
                          />
                        </Avatar>
                      </LeftIcon>
                      <RightInput>
                        <TypoGraphy>
                          {props.values.wallet
                            ? wallets[props.values.wallet].name
                            : "Select Wallet"}
                        </TypoGraphy>
                      </RightInput>
                    </IconInputWrapper>
                  </FormSpace>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.showCategoryModel}>
                  <FormSpace>
                    <IconInputWrapper center>
                      <LeftIcon>
                        <Avatar>
                          <Icon
                            type={
                              this.getCategoryIcon(props.values.category).type
                            }
                            name={
                              this.getCategoryIcon(props.values.category).name
                            }
                          />
                        </Avatar>
                      </LeftIcon>
                      <RightInput>
                        <TypoGraphy>
                          {props.values.category
                            ? categories[props.values.category].name
                            : "Select Category"}
                        </TypoGraphy>
                      </RightInput>
                    </IconInputWrapper>
                  </FormSpace>
                </TouchableHighlight>
                {props.values.wallet && (
                  <IconInputWrapper>
                    <LeftIcon>
                      <Avatar>
                        <TypoGraphy>
                          {this.getCurrencyCode(props.values.wallet)}
                        </TypoGraphy>
                      </Avatar>
                    </LeftIcon>
                    <RightInput>
                      <TextInput
                        onChangeText={props.handleChange("amount")}
                        onBlur={props.handleBlur("amount")}
                        value={props.values.amount}
                        keyboardType="numeric"
                      />
                    </RightInput>
                  </IconInputWrapper>
                )}
                <IconInputWrapper>
                  <LeftIcon>
                    <Avatar>
                      <Icon type="SimpleLineIcons" name="note" size={18} />
                    </Avatar>
                  </LeftIcon>
                  <RightInput>
                    <TextInput
                      onChangeText={props.handleChange("description")}
                      onBlur={props.handleBlur("description")}
                      value={props.values.description}
                      placeholder="Write some note..."
                    />
                  </RightInput>
                </IconInputWrapper>
                <IconInputWrapper>
                  <LeftIcon>
                    <Avatar>
                      <Icon type="Octicons" name="calendar" size={18} />
                    </Avatar>
                  </LeftIcon>
                  <RightInput>
                    <BorderBottom>
                      <DatePicker
                        date={props.values.dateTime}
                        onDateChange={props.handleChange("dateTime")}
                      />
                    </BorderBottom>
                    </RightInput>
                </IconInputWrapper>
                <WalletModel
                  visible={walletModelVisible}
                  onSelect={data => this.onSelectWallet(data, props)}
                />
                <CategoryModel
                  visible={categoryModelVisible}
                  onSelect={data => this.onSelectCategory(data, props)}
                />
              </Content>
              <Footer>
                <FooterButton>
                  <Button
                    rounded
                    onPress={props.handleSubmit}
                    text="Save"
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

// Maps state from store to props
const mapStateToProps = state => {
  return {
    wallets: state.wallets,
    categories: state.categories
  };
};

export default connect(mapStateToProps)(CreateExpense);
