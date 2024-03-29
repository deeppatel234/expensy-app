import React from "react";
import { TouchableOpacity } from "react-native";

import Icon from "Components/Icon";
import Typography from "Components/Typography";
import IconList from "Utils/IconList";
import CurrencyCode from "Utils/CurrencyCode";

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
        <Icon iconType={props.iconType || iconType} icon={props.icon || icon} color="white" />
      )}
    </Avatar>
  )
};

Avatar.Icon = ({ onPress, ...props }) => {

  if (!onPress) {
    return <AvatarIcon {...props} />
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <AvatarIcon {...props} />
    </TouchableOpacity>
  );
};

Avatar.Currency = ({ currency, ...props }) => (
  <Avatar {...props}>
    <Typography color="black">
      {CurrencyCode[currency].unicode}
    </Typography>
  </Avatar>
);

Avatar.defaultProps = {
  color: false
};

export default Avatar;
