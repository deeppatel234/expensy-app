import React, { Component } from "react";
import { connect } from "react-redux";

import { Formik } from "formik";
import { TouchableHighlight } from "react-native";

import DatePicker from "react-native-datepicker";
import formatDate from "date-fns/format";

import WalletModel from "../wallet/WalletModel";
import CategoryModel from "../category/CategoryModel";

import TextInput from "../../components/TextInput";
import TypoGraphy from "../../components/TypoGraphy";
import Button from "../../components/Button";
import Avatar from "../../components/Avatar";
import Icon from "../../components/Icon";

import IconList from "../icon/IconList";
import currencyCode from "../../utils/currencyCode";

import {
  Container,
  Heading,
  Content,
  Footer,
  IconInputWrapper,
  LeftIcon,
  RightInput,
  FormSpace
} from "../../../globalStyle";

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
    values.amount = parseFloat(values.amount);
    models
      .get("expense")
      .create(values, true)
      .then(dbRes => {
        console.tron.log(dbRes);
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
    return currencyCode[wallets[wallet].currency].unicode;
  }

  render() {
    const { walletModelVisible, categoryModelVisible } = this.state;
    const { categories, wallets } = this.props;

    return (
      <Container>
        <Heading>
          <TypoGraphy type="heading" appearance="primary">
            Add Transaction
          </TypoGraphy>
        </Heading>
        <Formik
          initialValues={{
            type: "expense",
            amount: "123.3",
            description: "hello description",
            dateTime: formatDate(new Date(), "DD/MM/YYYY")
          }}
          onSubmit={this.onSubmitForm}
        >
          {props => (
            <React.Fragment>
              <Content>
                <TextInput
                  onChangeText={props.handleChange("type")}
                  onBlur={props.handleBlur("type")}
                  value={props.values.type}
                />
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
                      <Icon type="SimpleLineIcons" name="note" size={20}/>
                    </Avatar>
                  </LeftIcon>
                  <RightInput>
                    <TextInput
                      onChangeText={props.handleChange("description")}
                      onBlur={props.handleBlur("description")}
                      value={props.values.description}
                    />
                  </RightInput>
                </IconInputWrapper>
                <FormSpace>
                  <DatePicker
                    date={props.values.dateTime}
                    placeholder="select date"
                    format="DD/MM/YYYY"
                    onDateChange={props.handleChange("dateTime")}
                  />
                </FormSpace>
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
                <Button
                  onPress={props.handleSubmit}
                  text="Submit"
                  appearance="primary"
                />
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
