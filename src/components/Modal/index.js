import React from "react";

import { Modal } from "react-native";

import Header from "Components/Header";
import Footer from "Components/Footer";

import { Container, Heading, SafeAreaView } from "Src/globalStyle";

const AppModal = ({ visible, onClose, heading, children, ...props }) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={visible}
    onRequestClose={onClose}
    {...props}
  >
    <SafeAreaView>
      <Container>
        {heading && (
          <Heading>
            <Header text={heading} menu={false} />
          </Heading>
        )}
        {children}
        <Footer actionIcon="close" onActionClick={onClose} />
      </Container>
    </SafeAreaView>
  </Modal>
);

export default AppModal;
