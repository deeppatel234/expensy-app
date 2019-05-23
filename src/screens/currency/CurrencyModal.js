import React from "react";

import { TouchableHighlight } from "react-native";

import Typography from "Components/Typography";
import Modal from "Components/Modal";
import Avatar from "Components/Avatar";

import CurrencyCode from "Utils/CurrencyCode";
import { BLACK } from "Src/theme";

import { Content, ListWrapper, ListItem, RightList } from "Src/globalStyle";

const CurrencyModal = ({ visible, onClose, onSelect }) => (
  <Modal visible={visible} onClose={onClose} heading="Currency">
    <Content>
      <ListWrapper>
        {Object.keys(CurrencyCode).map(code => (
          <TouchableHighlight key={code} onPress={() => onSelect(code)}>
            <ListItem>
              <Avatar>
                <Typography color={BLACK}>
                  {CurrencyCode[code].unicode}
                </Typography>
              </Avatar>
              <RightList>
                <Typography>{CurrencyCode[code].name}</Typography>
              </RightList>
            </ListItem>
          </TouchableHighlight>
        ))}
      </ListWrapper>
    </Content>
  </Modal>
);

export default CurrencyModal;
