import React from 'react';

import Icon from 'Components/Icon';
import IconList from 'Utils/IconList';

import { WHITE } from 'Src/theme';

import {
  AvatarWrapper,
  AvatarImage,
} from './styled';

const Image = ({ image, ...props }) => <AvatarImage source={image} {...props} />;

const Avatar = ({ ...props }) => <AvatarWrapper {...props} />

const AvatarIcon = ({ iconKey, ...props }) => {
  const { type, icon, iconType, image } = IconList[iconKey || 'PLACEHOLDER'];

  return (
    <Avatar colorChar={icon && icon[0]} {...props} bgColor>
      {
        type === 'image' && <Image source={image} />
      }
      {
        type === 'icon' && <Icon iconType={iconType} icon={icon} color={WHITE} />
      }
    </Avatar>
  )
};

Avatar.defaultProps = {
  color: false,
};

Avatar.Image = Image;
Avatar.Icon = AvatarIcon;

export default Avatar;
