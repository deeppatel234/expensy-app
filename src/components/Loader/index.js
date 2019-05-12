import React from 'react';
import { ActivityIndicator } from 'react-native';

import theme from 'Src/theme';

const Loader = ({ size }) => (
  <ActivityIndicator size={size} color={theme.primary} />
);

Loader.defaultProps = {
  size: 'large',
};

export default Loader;
