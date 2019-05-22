import React from "react";

import Icon from "Components/Icon";
import IconList from "Utils/IconList";

import { WHITE } from "Src/theme";

import { AvatarWrapper, AvatarImage } from "./styled";

const Avatar = AvatarWrapper;

Avatar.Image = ({ image, ...props }) => (
  <AvatarImage source={image} {...props} />
);

Avatar.Icon = ({ iconKey, ...props }) => {
  const { type, icon, iconType, image } = IconList[iconKey || "PLACEHOLDER"];

  return (
    <Avatar colorChar={icon && icon[0]} {...props} bgColor>
      {type === "image" && <Avatar.Image source={image} />}
      {type === "icon" && (
        <Icon iconType={iconType} icon={icon} color={WHITE} />
      )}
    </Avatar>
  );
};

Avatar.defaultProps = {
  color: false
};

export default Avatar;
