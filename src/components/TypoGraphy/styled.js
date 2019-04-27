import styled, { css } from 'styled-components';

export const TypoGraphyText = styled.Text`
  ${props => props.primary && css`
    color: ${props.theme.primary};
  `}
`;