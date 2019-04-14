import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Modal,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';


class WalletModel extends Component {
  render() {
    const {
      visible,
      onSelect,
      wallets,
    } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
      >
        <View>
          {
            Object.values(wallets).map((wallet) => (
              <TouchableHighlight key={wallet._id} onPress={() => onSelect(wallet)}>
                <Text>{wallet.icon} - {wallet.type} - {wallet.name} - {wallet.balance}</Text>
              </TouchableHighlight>
            ))
          }
        </View>
      </Modal>
    );
  }
}

// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    wallets: state.wallets,
  };
};

export default connect(mapStateToProps)(WalletModel);
