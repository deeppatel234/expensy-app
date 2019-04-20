import React, { Component } from 'react';

import { Text, View, TextInput, Button } from 'react-native';
import { Formik } from "formik";
import DatePicker from 'react-native-datepicker';
import formatDate from 'date-fns/format';

import WalletModel from '../wallet/WalletModel';
import CategoryModel from '../category/CategoryModel';

import models from '../../sql/models';

class CreateExpense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      walletModelVisible: false,
      categoryModelVisible: false,
    };

    this.onSelectWallet = this.onSelectWallet.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.showWalletModel = this.showWalletModel.bind(this);
    this.showCategoryModel = this.showCategoryModel.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSelectWallet(data, props) {
    props.setFieldValue('wallet', data._id);
    this.setState({ walletModelVisible: false });
  }

  onSelectCategory(data, props) {
    props.setFieldValue('category', data._id);
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
    models.get('expense').create(values, true).then((dbRes) => {
      console.tron.log(dbRes);
    });
  }

  render() {
    const { walletModelVisible, categoryModelVisible } = this.state;

    return (
      <View>
        <Text>Create Expense</Text>
        <Formik
          initialValues={{
            type: "expense",
            amount: "123.3",
            description: "hello description",
            dateTime: formatDate(new Date(), 'DD/MM/YYYY'),
          }}
          onSubmit={this.onSubmitForm}
        >
          {props => (
            <View>
              <TextInput
                onChangeText={props.handleChange("type")}
                onBlur={props.handleBlur("type")}
                value={props.values.type}
              />
              <TextInput
                onChangeText={props.handleChange("description")}
                onBlur={props.handleBlur("description")}
                value={props.values.description}
              />
              <TextInput
                onChangeText={props.handleChange("amount")}
                onBlur={props.handleBlur("amount")}
                value={props.values.amount}
                keyboardType="numeric"
              />
              <DatePicker
                date={props.values.dateTime}
                placeholder="select date"
                format="DD/MM/YYYY"
                onDateChange={props.handleChange("dateTime")}
              />
              <Button onPress={this.showWalletModel} title="Select Wallet" />
              <WalletModel
                visible={walletModelVisible}
                onSelect={(data) => this.onSelectWallet(data, props)}
              />
              <Button onPress={this.showCategoryModel} title="Select Category" />
              <CategoryModel
                visible={categoryModelVisible}
                onSelect={(data) => this.onSelectCategory(data, props)}
              />
              <Button onPress={props.handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

export default CreateExpense;
