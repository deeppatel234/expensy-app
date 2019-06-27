import React from "react";
import { connect } from "react-redux";

import Header from "Components/Header";
import Footer from "Components/Footer";

import { EditPanel } from "./components/Panel";

import { Container, Heading, Content, ListWrapper } from "Src/globalStyle";

const WalletList = ({ wallets }) => (
  <Container>
    <Heading>
      <Header text="Wallets" />
    </Heading>
    <Content>
      <ListWrapper>
        {Object.values(wallets).map(wallet => (
          <EditPanel key={wallet._id} wallet={wallet} />
        ))}
      </ListWrapper>
    </Content>
    <Footer actionIcon="add" actionLink="/create-wallet" />
  </Container>
);

// Maps state from store to props
const mapStateToProps = state => {
  return {
    wallets: state.wallets
  };
};

export default connect(mapStateToProps)(WalletList);
