import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  AvatarWrapper
} from './styled';

const Avatar = ({ children , ...props}) => {
  return (
    <AvatarWrapper>
      <Icon {...props} size={25} />
    </AvatarWrapper>
  );
};

export default Avatar;
