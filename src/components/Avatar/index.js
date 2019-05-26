import React from "react";
import { TouchableHighlight } from "react-native";

import Icon from "Components/Icon";
import Typography from "Components/Typography";
import IconList from "Utils/IconList";
import CurrencyCode from "Utils/CurrencyCode";

import { WHITE, BLACK } from "Src/theme";

import { AvatarWrapper, AvatarImage } from "./styled";

const Avatar = AvatarWrapper;

Avatar.Image = ({ image, ...props }) => (
  <AvatarImage source={image} {...props} />
);

const AvatarIcon = ({ iconKey, ...props }) => {
  const { type, icon, iconType, image } = IconList[iconKey || "PLACEHOLDER"];

  return (
    <Avatar colorChar={icon && icon[0]} {...props} bgColor>
      {type === "image" && <Avatar.Image source={image} />}
      {type === "icon" && (
        <Icon iconType={iconType} icon={icon} color={WHITE} />
      )}
    </Avatar>
  )
};

Avatar.Icon = ({ onPress, ...props }) => {

  if (!onPress) {
    return <AvatarIcon {...props} />
  }

  return (
    <TouchableHighlight onPress={onPress}>
      <AvatarIcon {...props} />
    </TouchableHighlight>
  );
};

Avatar.Currency = ({ currency, ...props }) => (
  <Avatar {...props}>
    <Typography color={BLACK}>
      {CurrencyCode[currency].unicode}
    </Typography>
  </Avatar>
);

Avatar.defaultProps = {
  color: false
};

export default Avatar;
