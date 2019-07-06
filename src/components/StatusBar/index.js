import React from "react";
import { StatusBar } from "react-native";
import { withTheme } from "styled-components";

const StatusBarComp = ({ theme, appearance, ...props }) => (
  <StatusBar animated backgroundColor={theme[appearance]} {...props} />
);

StatusBarComp.defaultProps = {
  appearance: "statusBar"
};

export default withTheme(StatusBarComp);
