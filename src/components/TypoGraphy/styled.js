import styled, { css } from 'styled-components';

export const TypoGraphyText = styled.Text`
  color: ${props => props.color || props.theme[props.appearance]};
`;
