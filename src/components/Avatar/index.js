import React from "react";
import { TouchableHighlight } from "react-native";

import Icon from "Components/Icon";
import IconList from "Utils/IconList";

import { WHITE } from "Src/theme";

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

Avatar.defaultProps = {
  color: false
};

export default Avatar;
