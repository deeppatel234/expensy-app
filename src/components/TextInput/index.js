import React from "react";
import { withTheme } from "styled-components";

import { TYPO_STYLE } from "Components/Typography";
import Typography from "Components/Typography";
import { Input, InputWrapper, Error } from "./styled";

const TextInput = ({ appearance, theme, color, error, ...props }) => (
  <InputWrapper>
    <Input
      {...props}
      style={{ ...TYPO_STYLE.small, color: color ? theme.brand[color] : theme[appearance] }}
      placeholderStyle={TYPO_STYLE.small}
      placeholderTextColor={color || theme[appearance]}
      error={error}
    />
    {error && (
      <Error>
        <Typography type="small" appearance="red">
          {error}
        </Typography>
      </Error>
    )}
  </InputWrapper>
);

TextInput.defaultProps = {
  appearance: "black",
  color: false
};

export default withTheme(TextInput);
