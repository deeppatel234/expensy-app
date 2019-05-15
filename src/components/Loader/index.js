import React from 'react';
import { withTheme } from 'styled-components';
import { ActivityIndicator } from 'react-native';

const Loader = ({ size, color, theme }) => (
  <ActivityIndicator size={size} color={theme[color]} />
);

Loader.defaultProps = {
  size: 'large',
  color: 'primary',
};

export default withTheme(Loader);
