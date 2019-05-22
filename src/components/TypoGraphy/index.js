import React from "react";
import { StyleSheet } from "react-native";

import { TypographyText } from "./styled";

const FONT_FAMILY = {
  REGULAR: "Montserrat-Regular",
  MEDIUM: "Montserrat-Medium",
  SEMI_BOLD: "Montserrat-SemiBold",
  BOLD: "Montserrat-Bold"
};

export const TYPO_STYLE = StyleSheet.create({
  appLogo: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 40
  },
  heading: {
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 32
  },
  title: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: 16
  },
  default: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: 14
  },
  small: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 12
  }
});

const Typography = ({ children, type, ...props }) => {
  return (
    <TypographyText style={TYPO_STYLE[type]} {...props}>
      {children}
    </TypographyText>
  );
};

Typography.defaultProps = {
  type: "default",
  appearance: "black",
  color: false
};

export default Typography;
