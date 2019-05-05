import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  AvatarWrapper,
} from './styled';

const ICON_TYPE = {
  Ionicons,
};

const Avatar = ({ children, type, ...props}) => {
  const Icon = ICON_TYPE[type];
  return (
    <AvatarWrapper>
      <Icon size={25} {...props} />
    </AvatarWrapper>
  );
};

export default Avatar;
