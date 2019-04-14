import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-native';

import { View, Text } from "react-native";

const ViewWallet = ({ wallets }) => (
  <View>
    {
      Object.values(wallets).map((wallet) => (
        <Text key={wallet._id}>{wallet.icon} - {wallet.type} - {wallet.name} - {wallet.balance}</Text>
      ))
    }
    <Link to='/create-wallet'><Text>Create Wallet</Text></Link>
  </View>
);

// Maps state from store to props
const mapStateToProps = state => {
  return {
    wallets: state.wallets
  };
};

export default connect(mapStateToProps)(ViewWallet);
