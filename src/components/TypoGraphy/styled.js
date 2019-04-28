import styled, { css } from 'styled-components';

export const TypoGraphyText = styled.Text`
  color: ${props => props.theme[props.appearance]};
`;
