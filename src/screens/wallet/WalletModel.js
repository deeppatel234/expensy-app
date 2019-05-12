import React from 'react';
import { connect } from 'react-redux';

import { Modal, TouchableHighlight } from 'react-native';

import TypoGraphy from 'Components/TypoGraphy';
import Avatar from 'Components/Avatar';
import Icon from 'Components/Icon';
import Header from 'Components/Header';

import IconList from 'Utils/IconList';
import CurrencyCode from 'Utils/CurrencyCode';

import {
  Container,
  Heading,
  Content,
  ListWrapper,
  ListItem,
  ListDetails,
} from '../../../globalStyle';


const WalletModel = ({ visible, wallets, onSelect }) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={visible}
  >
    <Container>
      <Heading>
        <Header text="Wallets" />
      </Heading>
      <Content>
        <ListWrapper>
          {
            Object.values(wallets).map((wallet) => (
              <TouchableHighlight key={wallet._id} onPress={() => onSelect(wallet)}>
                <ListItem>
                  <Avatar>
                    <Icon type={IconList[wallet.icon].type} name={IconList[wallet.icon].name} />
                  </Avatar>
                  <ListDetails>
                    <TypoGraphy>{wallet.name}</TypoGraphy>
                    <TypoGraphy type="small">{wallet.balance} {CurrencyCode[wallet.currency].unicode}</TypoGraphy>
                  </ListDetails>
                </ListItem>
              </TouchableHighlight>
            ))
          }
        </ListWrapper>
      </Content>
    </Container>
  </Modal>
);

// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    wallets: state.wallets,
  };
};

export default connect(mapStateToProps)(WalletModel);
