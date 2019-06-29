import React from "react";
import _pickBy from "lodash/pickBy";

import { TouchableOpacity } from "react-native";

import Avatar from "Components/Avatar";
import Modal from "Components/Modal";

import IconList from "Utils/IconList";

import { Content } from "Src/globalStyle";

import { IconWrapper, Wrapper } from "./styled";

const IconModal = ({ visible, onClose, onSelect, group }) => {
  let iconList = IconList;
  if (group) {
    iconList = _pickBy(iconList, i => i.group === group);
  }
  return (
    <Modal visible={visible} onClose={onClose} heading="Icons">
      <Content>
        <Wrapper>
          {Object.keys(iconList).map(key => (
            <TouchableOpacity key={key} onPress={() => onSelect(key)}>
              <IconWrapper>
                <Avatar.Icon iconKey={key} />
              </IconWrapper>
            </TouchableOpacity>
          ))}
        </Wrapper>
      </Content>
    </Modal>
  );
};

export default IconModal;
