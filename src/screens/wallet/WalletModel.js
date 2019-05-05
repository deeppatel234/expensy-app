import React from 'react';
import { connect } from 'react-redux';

import { Modal, TouchableHighlight } from 'react-native';

import TypoGraphy from '../../components/TypoGraphy';
import Avatar from '../../components/Avatar';

import IconList from "../icon/IconList";
import currencyCode from '../../utils/currencyCode';

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
        <TypoGraphy type="heading" appearance="primary">Wallets</TypoGraphy>
      </Heading>
      <Content>
        <ListWrapper>
          {
            Object.values(wallets).map((wallet) => (
              <TouchableHighlight key={wallet._id} onPress={() => onSelect(wallet)}>
                <ListItem>
                  <Avatar type={IconList[wallet.icon].type} name={IconList[wallet.icon].name} />
                  <ListDetails>
                    <TypoGraphy>{wallet.name}</TypoGraphy>
                    <TypoGraphy type="small">{wallet.balance} {currencyCode[wallet.currency].unicode}</TypoGraphy>
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
