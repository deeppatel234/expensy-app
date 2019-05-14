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
  appLogo: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 40,
  },
  heading: {
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 32,
  },
  title: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: 16,
  },
  default: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: 14,
  },
  small: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 12,
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
