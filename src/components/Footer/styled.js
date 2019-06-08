import styled from "styled-components";

export const FooterWrapper = styled.View`
  width: 100%;
  background-color: ${props => props.theme.primary};
  height: 48px;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const FooterButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  background: ${props => props.theme.primary};
  border-color: ${props => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 50px;
  border-width: 5px;
  height: 61px;
  width: 61px;
  margin-bottom: 15px;
`;

export const LeftFooter = styled.View`
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RightFooter = styled.View`
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MenuButton = styled.TouchableOpacity`
  height: 100%;
  width: 30px;
`;
