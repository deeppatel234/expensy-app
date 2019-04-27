import React from 'react';
import { StyleSheet, Text } from 'react-native';

const FONT_FAMILY = {
  REGULAR: 'Montserrat-Regular',
  MEDIUM: 'Montserrat-Medium',
  SEMI_BOLD: 'Montserrat-SemiBold',
  BOLD: 'Montserrat-Bold',
};

const TYPO_STYLE = StyleSheet.create({
  heading: {
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 40,
  },
  default: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: 18,
  },
});

const TypoGraphy = ({ children , type, ...props}) => {
  return <Text style={TYPO_STYLE[type]} {...props}>{children}</Text>;
};

TypoGraphy.defaultProps = {
  type: 'default',
};

export default TypoGraphy;
