import React from "react";

import { TouchableOpacity } from "react-native";

import Typography from "Components/Typography";
import Modal from "Components/Modal";
import Avatar from "Components/Avatar";

import CurrencyCode from "Utils/CurrencyCode";

import { Content, ListWrapper, ListItem, RightList } from "Src/globalStyle";

const CurrencyModal = ({ visible, onClose, onSelect }) => (
  <Modal visible={visible} onClose={onClose} heading="Currency">
    <Content>
      <ListWrapper>
        {Object.keys(CurrencyCode).map(code => (
          <TouchableOpacity key={code} onPress={() => onSelect(code)}>
            <ListItem>
              <Avatar.Currency currency={code} />
              <RightList>
                <Typography>{CurrencyCode[code].name}</Typography>
              </RightList>
            </ListItem>
          </TouchableOpacity>
        ))}
      </ListWrapper>
    </Content>
  </Modal>
);

export default CurrencyModal;
