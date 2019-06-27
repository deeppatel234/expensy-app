import React from "react";
import { withTheme } from "styled-components";
import { ActivityIndicator } from "react-native";

const Loader = ({ size, appearance, color, theme }) => (
  <ActivityIndicator size={size} color={color ? theme.brand[color] : theme[appearance]} />
);

Loader.defaultProps = {
  size: "large",
  appearance: "primary",
  color: false
};

export default withTheme(Loader);
