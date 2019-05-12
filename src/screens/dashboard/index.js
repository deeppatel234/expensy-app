import React, { Component } from "react";
import { connect } from "react-redux";

import Redux from "Redux/ReduxRegistry";
import Header from "Components/Header";
import Link from "Components/Link";

import {
  Container,
  Heading,
  Content,
  Footer,
  FooterButton
} from "Src/globalStyle";

import TotalAmount from "./widgets/TotalAmount";

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
        </Content>
        <Footer>
          <FooterButton>
            <Link
              rounded
              to="/create-expense"
              text="Add Transaction"
              appearance="primary"
            />
          </FooterButton>
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
