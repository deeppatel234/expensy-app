import React from "react";
import { connect } from "react-redux";

import Typography from 'Components/Typography';
import Avatar from 'Components/Avatar';
import Link from 'Components/Link';
import Header from 'Components/Header';
import Footer from 'Components/Footer';

import CurrencyCode from 'Utils/CurrencyCode';

import {
  Container,
  Heading,
  Content,
  ListWrapper,
  ListItem,
  ListDetails,
} from 'Src/globalStyle';

const ViewWallet = ({ wallets }) => (
  <Container>
    <Heading>
      <Header text="Wallets" />
    </Heading>
    <Content>
      <ListWrapper>
        {
          Object.values(wallets).map((wallet) => (
            <ListItem key={wallet._id}>
              <Avatar.Icon iconKey={wallet.icon} />
              <ListDetails>
                <Typography>{wallet.name}</Typography>
                <Typography type="small">{wallet.balance} {CurrencyCode[wallet.currency].unicode}</Typography>
              </ListDetails>
            </ListItem>
          ))
        }
      </ListWrapper>
    </Content>
    <Footer>
      <Link to='/create-wallet' component={Footer.AddButton} />
    </Footer>
  </Container>
);

// Maps state from store to props
const mapStateToProps = state => {
  return {
    wallets: state.wallets
  };
};

export default connect(mapStateToProps)(ViewWallet);
