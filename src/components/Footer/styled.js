import styled from "styled-components";

export const FooterWrapper = styled.View`
  width: 100%;
  background-color: ${props => props.theme.primary};
  height: 40px;
  position: relative;
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
  height: 65px;
  width: 65px;
  margin-bottom: 10px;
`;
