import styled from "styled-components";

import { FlexRow } from "Src/globalStyle";

export const FooterWrapper = styled(FlexRow)`
  width: 100%;
  background-color: ${props => props.theme.primary};
  height: 48px;
`;

export const LeftFooter = styled(FlexRow)`
  flex-grow: 2;
`;

export const RightFooter = styled(FlexRow)`
  flex-grow: 2;
  flex-direction: row-reverse;
`;

export const ActionButtonWrapper = styled.View`
  position: relative;
  flex-grow: 1;
  align-self: center;
`;

export const FooterButton = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -5;
  background: ${props => props.theme.primary};
  border-color: ${props => props.theme.white};
  border-radius: 50px;
  border-width: 5px;
  height: 61px;
  width: 61px;
`;

export const MenuButton = styled.TouchableOpacity`
  height: 100%;
  padding: 0 15px;
`;
