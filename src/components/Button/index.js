import React from "react";

import Typography from "Components/Typography";

import { ButtonElement } from "./styled";

const APPEARANCE_MAP = {
  primary: "white",
  white: "primary",
  red: "white",
};

const Button = props => (
  <ButtonElement {...props}>
    <Typography appearance={APPEARANCE_MAP[props.appearance]}>
      {props.text}
    </Typography>
  </ButtonElement>
);

Button.defaultProps = {
  appearance: "white",
  block: false,
  small: false,
};

export default Button;
