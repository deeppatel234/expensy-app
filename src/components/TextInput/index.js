import React from "react";
import { withTheme } from 'styled-components';

import { Input, InputWrapper, Error } from "./styled";
import { TYPO_STYLE } from "../TypoGraphy";
import TypoGraphy from "../TypoGraphy";

const TextInput = ({ appearance, theme, color, error, ...props }) => (
  <InputWrapper>
    <Input
      {...props}
      style={{ ...TYPO_STYLE.small, color: color || theme[appearance] }}
      placeholderStyle={TYPO_STYLE.small}
      placeholderTextColor={color || theme[appearance]}
      error={error}
    />
    {
      error && <Error><TypoGraphy type="small" appearance="danger">{error}</TypoGraphy></Error>
    }
  </InputWrapper>
);

TextInput.defaultProps = {
  appearance: 'default',
  color: false,
};

export default withTheme(TextInput);
