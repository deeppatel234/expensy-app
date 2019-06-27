import styled from "styled-components";

export const TypographyText = styled.Text`
  color: ${props => props.color ? props.theme.brand[props.color] : props.theme[props.appearance]};
`;
