import React, { Component } from "react";
import { connect } from "react-redux";

import { Formik } from "formik";
import * as Yup from 'yup';

import { TouchableHighlight } from "react-native";

import formatDate from "date-fns/format";

import WalletModal from "Screens/wallet/WalletModal";
import CategoryModal from "Screens/category/CategoryModal";

import DatePicker from "Components/DatePicker";
import TextInput from "Components/TextInput";
import TypoGraphy from "Components/TypoGraphy";
import Radio from "Components/RadioButton";
import Avatar from "Components/Avatar";
import Icon from "Components/Icon";
import Header from 'Components/Header';
import Footer from 'Components/Footer';

import CurrencyCode from "Utils/CurrencyCode";

import { EXPENSE_TYPES } from 'Models/ExpenseModel';

import { BLACK } from 'Src/theme';

import {
  Container,
  Heading,
  Content,
  IconInputWrapper,
  LeftIcon,
  RightInput,
  FormSpace,
  BorderBottom
} from "Src/globalStyle";

import models from "../../sql/models";

const CategorySchema = Yup.object().shape({
  amount: Yup.string()
    .required('Required')
    .test("len", "Amount should be greater than 0", val => {
      return parseFloat(val || 0) > 0;
    }),
  wallet: Yup.string()
    .required('Required'),
  category: Yup.string()
    .required('Required'),
});

class CreateExpense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      walletModalVisible: false,
      categoryModalVisible: false
    };

    this.onSelectWallet = this.onSelectWallet.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.showWalletModal = this.showWalletModal.bind(this);
    this.closeWalletModal = this.closeWalletModal.bind(this);
    this.showCategoryModal = this.showCategoryModal.bind(this);
    this.closeCategoryModal = this.closeCategoryModal.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSelectWallet(data, props) {
    props.setFieldValue("wallet", data._id);
    this.setState({ walletModalVisible: false });
  }

  onSelectCategory(data, props) {
    props.setFieldValue("category", data._id);
    this.setState({ categoryModalVisible: false });
  }

  showWalletModal() {
    this.setState({ walletModalVisible: true });
  }

  showCategoryModal() {
    this.setState({ categoryModalVisible: true });
  }

  closeCategoryModal() {
    this.setState({ categoryModalVisible: false });
  }

  closeWalletModal() {
    this.setState({ walletModalVisible: false });
  }

  onSubmitForm(values) {
    const { history } = this.props;
    values.amount = parseFloat(values.amount || 0);
    models
      .get("expense")
      .create(values, true)
      .then(() => {
        history.goBack();
      });
  }

  getCategoryIcon(category) {
    const { categories } = this.props;
    return category ? categories[category].icon : 'PLACEHOLDER';
  }

  getWalletIcon(wallet) {
    const { wallets } = this.props;
    return wallet ? wallets[wallet].icon : 'PLACEHOLDER';
  }

  getCurrencyCode(wallet) {
    const { wallets } = this.props;
    return CurrencyCode[wallets[wallet].currency].unicode;
  }

  render() {
    const { walletModalVisible, categoryModalVisible } = this.state;
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
          validationSchema={CategorySchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {props => (
            <React.Fragment>
              <Content>
                <FormSpace>
                  <Radio.Group selectedValue={props.values.type} onChange={props.handleChange("type")}>
                    <Radio.Button value={EXPENSE_TYPES.EXPENSE} text="Expense" style={{ flexGrow: 1 }} />
                    <Radio.Button value={EXPENSE_TYPES.INCOME} text="Incomes" style={{ flexGrow: 1 }} />
                  </Radio.Group>
                </FormSpace>
                <TouchableHighlight onPress={this.showWalletModal}>
                  <FormSpace>
                    <IconInputWrapper center>
                      <LeftIcon>
                        <Avatar.Icon iconKey={this.getWalletIcon(props.values.wallet)} />
                      </LeftIcon>
                      <RightInput>
                        <TypoGraphy>
                          {props.values.wallet
                            ? wallets[props.values.wallet].name
                            : "Select Wallet"}
                        </TypoGraphy>
                        {
                          props.errors.wallet && <TypoGraphy type="small" appearance="red">{props.errors.wallet}</TypoGraphy>
                        }
                      </RightInput>
                    </IconInputWrapper>
                  </FormSpace>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.showCategoryModal}>
                  <FormSpace>
                    <IconInputWrapper center>
                      <LeftIcon>
                        <Avatar.Icon iconKey={this.getCategoryIcon(props.values.category)} />
                      </LeftIcon>
                      <RightInput>
                        <TypoGraphy>
                          {props.values.category
                            ? categories[props.values.category].name
                            : "Select Category"}
                        </TypoGraphy>
                        {
                          props.errors.category && <TypoGraphy type="small" appearance="red">{props.errors.category}</TypoGraphy>
                        }
                      </RightInput>
                    </IconInputWrapper>
                  </FormSpace>
                </TouchableHighlight>
                {props.values.wallet && (
                  <IconInputWrapper>
                    <LeftIcon>
                      <Avatar>
                        <TypoGraphy color={BLACK}>
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
                        error={props.errors.amount}
                      />
                    </RightInput>
                  </IconInputWrapper>
                )}
                <IconInputWrapper>
                  <LeftIcon>
                    <Avatar>
                      <Icon type="SimpleLineIcons" name="note" size={18} color={BLACK} />
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
                      <Icon type="Octicons" name="calendar" size={18} color={BLACK} />
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
                <WalletModal
                  visible={walletModalVisible}
                  onSelect={data => this.onSelectWallet(data, props)}
                  onClose={this.closeWalletModal}
                />
                <CategoryModal
                  visible={categoryModalVisible}
                  onSelect={data => this.onSelectCategory(data, props)}
                  onClose={this.closeCategoryModal}
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

// Maps state from store to props
const mapStateToProps = state => {
  return {
    wallets: state.wallets,
    categories: state.categories
  };
};

export default connect(mapStateToProps)(CreateExpense);
