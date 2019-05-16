import React from 'react';

import {
  AvatarWrapper,
} from './styled';


const Avatar = (props) => <AvatarWrapper {...props}/>

Avatar.defaultProps = {
  color: false,
};

export default Avatar;
