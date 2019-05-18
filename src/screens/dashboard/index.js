import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "Components/Header";
import Link from "Components/Link";
import Footer from 'Components/Footer';

import {
  Container,
  Heading,
  Content,
} from "Src/globalStyle";

import TotalAmount from "./widgets/TotalAmount";
import CategoryWise from "./widgets/CategoryWise";
import TransactionList from "./widgets/TransactionList";

class Dashboard extends Component {
  render() {
    const { user } = this.props;

    return (
      <Container>
        <Heading>
          <Header text="Dashboard" />
        </Heading>
        <Content>
          <TotalAmount />
          <TransactionList />
          <CategoryWise type="expense" />
          <CategoryWise type="income" />
        </Content>
        <Footer>
          <Link to='/create-expense' component={Footer.AddButton} />
        </Footer>
      </Container>
    );
  }
}

// Maps state from store to props
const mapStateToProps = state => {
  return {
    user: state.user,
    categories: state.categories,
    wallets: state.wallets
  };
};

export default connect(mapStateToProps)(Dashboard);
