import React from "react";
import { connect } from "react-redux";

import TypoGraphy from 'Components/TypoGraphy';
import Avatar from 'Components/Avatar';
import Icon from 'Components/Icon';
import Link from 'Components/Link';
import Header from 'Components/Header';

import IconList from 'Utils/IconList';
import CurrencyCode from 'Utils/CurrencyCode';

import {
  Container,
  Heading,
  Content,
  Footer,
  FooterButton,
  ListWrapper,
  ListItem,
  ListDetails,
} from '../../../globalStyle';

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
              <Avatar>
                <Icon type={IconList[wallet.icon].type} name={IconList[wallet.icon].name} />
              </Avatar>
              <ListDetails>
                <TypoGraphy>{wallet.name}</TypoGraphy>
                <TypoGraphy type="small">{wallet.balance} {CurrencyCode[wallet.currency].unicode}</TypoGraphy>
              </ListDetails>
            </ListItem>
          ))
        }
      </ListWrapper>
    </Content>
    <Footer>
      <FooterButton>
        <Link to='/create-wallet' text="Add Wallet" appearance="primary" rounded />
      </FooterButton>
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
