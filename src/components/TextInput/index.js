import React from "react";
import { withTheme } from 'styled-components';

import { Input } from "./styled";
import { TYPO_STYLE } from "../TypoGraphy";

const TextInput = ({ appearance, theme, color, ...props }) => (
  <Input
    {...props}
    style={{ ...TYPO_STYLE.small, color: color || theme[appearance] }}
    placeholderStyle={TYPO_STYLE.small}
    placeholderTextColor={color || theme[appearance]}
  />
);

TextInput.defaultProps = {
  appearance: 'default',
  color: false,
};

export default withTheme(TextInput);
