import React from "react";
import { connect } from "react-redux";

import Link from "Components/Link";
import Header from "Components/Header";
import Footer from "Components/Footer";

import WalletPanel from "./components/WalletPanel";

import {
  Container,
  Heading,
  Content,
  ListWrapper,
} from "Src/globalStyle";

const WalletList = ({ wallets }) => (
  <Container>
    <Heading>
      <Header text="Wallets" />
    </Heading>
    <Content>
      <ListWrapper>
        {Object.values(wallets).map(wallet => (
          <Link
            key={wallet._id}
            to={`/edit-wallet/${wallet._id}`}
            wallet={wallet}
            component={WalletPanel}
          />
        ))}
      </ListWrapper>
    </Content>
    <Footer>
      <Link to="/create-wallet" component={Footer.AddButton} />
    </Footer>
  </Container>
);

// Maps state from store to props
const mapStateToProps = state => {
  return {
    wallets: state.wallets
  };
};

export default connect(mapStateToProps)(WalletList);
