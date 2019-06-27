import styled from "styled-components";
import { getAvatarColor } from "Utils/IconColor";

const AVATAR_SIZE = "35px";
const AVATAR_BORDER_RADIUS = "17";

const getColor = (props) => {
  if (props.color) {
    return props.theme.brand(props.color);
  }
  if (props.appearance) {
    return props.theme[props.appearance];
  }
  if (props.colorChar) {
    return getAvatarColor(props.colorChar);
  }
  return props.theme.lightGray;
};

export const AvatarWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${getColor};
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  border-radius: ${AVATAR_BORDER_RADIUS};
`;

export const AvatarImage = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  border-radius: ${AVATAR_BORDER_RADIUS};
`;
