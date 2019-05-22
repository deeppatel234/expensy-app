import React from "react";
import { connect } from "react-redux";

import { TouchableHighlight } from "react-native";

import Typography from "Components/Typography";
import Avatar from "Components/Avatar";
import Modal from 'Components/Modal';

import CurrencyCode from "Utils/CurrencyCode";

import {
  Content,
  ListWrapper,
  ListItem,
  ListDetails,
} from "Src/globalStyle";

const WalletModal = ({ visible, wallets, onClose, onSelect }) => (
  <Modal visible={visible} onClose={onClose} heading="Wallets">
    <Content>
      <ListWrapper>
        {Object.values(wallets).map(wallet => (
          <TouchableHighlight key={wallet._id} onPress={() => onSelect(wallet)}>
            <ListItem>
              <Avatar.Icon iconKey={wallet.icon} />
              <ListDetails>
                <Typography>{wallet.name}</Typography>
                <Typography type="small">
                  {wallet.balance} {CurrencyCode[wallet.currency].unicode}
                </Typography>
              </ListDetails>
            </ListItem>
          </TouchableHighlight>
        ))}
      </ListWrapper>
    </Content>
  </Modal>
);

// Maps state from store to props
const mapStateToProps = state => {
  return {
    wallets: state.wallets
  };
};

export default connect(mapStateToProps)(WalletModal);
