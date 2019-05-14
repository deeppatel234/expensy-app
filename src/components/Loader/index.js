import React from 'react';
import { ActivityIndicator } from 'react-native';

import theme from 'Src/theme';

const Loader = ({ size, color }) => (
  <ActivityIndicator size={size} color={theme[color]} />
);

Loader.defaultProps = {
  size: 'large',
  color: 'primary',
};

export default Loader;
