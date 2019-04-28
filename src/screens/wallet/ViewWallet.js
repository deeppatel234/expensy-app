import React from "react";
import { connect } from "react-redux";

import TypoGraphy from '../../components/TypoGraphy';
import Avatar from '../../components/Avatar';
import Link from '../../components/Link';

import currencyCode from '../../utils/currencyCode';

import {
  Container,
  Heading,
  Content,
  Footer,
  ListWrapper,
  ListItem,
  ListDetails,
} from '../../../globalStyle';

const ViewWallet = ({ wallets }) => (
  <Container>
    <Heading>
      <TypoGraphy type="heading" appearance="primary">Wallets</TypoGraphy>
    </Heading>
    <Content>
      <ListWrapper>
        {
          Object.values(wallets).map((wallet) => (
            <ListItem key={wallet._id}>
              <Avatar name="ios-laptop" />
              <ListDetails>
                <TypoGraphy>{wallet.name}</TypoGraphy>
                <TypoGraphy type="small">{wallet.balance} {currencyCode.INDIAN_RUPEE.unicode}</TypoGraphy>
              </ListDetails>
            </ListItem>
          ))
        }
      </ListWrapper>
    </Content>
    <Footer>
      <Link to='/create-wallet' text="Add Wallet" appearance="primary" />
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
