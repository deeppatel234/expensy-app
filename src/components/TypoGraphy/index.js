import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { TypoGraphyText } from './styled';

const FONT_FAMILY = {
  REGULAR: 'Montserrat-Regular',
  MEDIUM: 'Montserrat-Medium',
  SEMI_BOLD: 'Montserrat-SemiBold',
  BOLD: 'Montserrat-Bold',
};

export const TYPO_STYLE = StyleSheet.create({
  heading: {
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 40,
  },
  default: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: 18,
  },
  small: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 14,
  },
});

const TypoGraphy = ({ children , type, ...props}) => {
  return <TypoGraphyText style={TYPO_STYLE[type]} {...props}>{children}</TypoGraphyText>;
};

TypoGraphy.defaultProps = {
  type: 'default',
  appearance: 'default',
};

export default TypoGraphy;
