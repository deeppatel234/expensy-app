import React from "react";

import Modal from "Components/Modal";

import { COLORS } from "Src/theme";
import { Content } from "Src/globalStyle";

import { ColorWrapper, ColorIcon } from './styled';

const ColorTheme = ({ visible, onSelect, onClose }) => (
  <Modal visible={visible} onClose={onClose} heading="Select Color">
    <Content>
      <ColorWrapper>
        {Object.keys(COLORS).map(color => (
          <ColorIcon
            key={color}
            margin={15}
            color={COLORS[color]}
            onPress={() => onSelect(color)}
          />
        ))}
      </ColorWrapper>
    </Content>
  </Modal>
);

export default ColorTheme;
