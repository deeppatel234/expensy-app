import React from "react";
import { connect } from "react-redux";

import Modal from "Components/Modal";

import WalletPanel from "./components/Panel";

import { Content, ListWrapper } from "Src/globalStyle";

const WalletModal = ({ visible, wallets, onClose, onSelect }) => (
  <Modal visible={visible} onClose={onClose} heading="Wallets">
    <Content>
      <ListWrapper>
        {Object.values(wallets).map(wallet => (
          <WalletPanel
            key={wallet._id}
            onPress={() => onSelect(wallet)}
            wallet={wallet}
          />
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
