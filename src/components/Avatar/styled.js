import styled from "styled-components";
import { getAvatarColor } from "Utils/IconColor";

const AVATAR_SIZE = "35px";
const AVATAR_BORDER_RADIUS = "17";

export const AvatarWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props =>
    props.color ||
    (props.colorChar && getAvatarColor(props.colorChar)) ||
    props.theme.lightGray};
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  border-radius: ${AVATAR_BORDER_RADIUS};
`;

export const AvatarImage = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  border-radius: ${AVATAR_BORDER_RADIUS};
`;
