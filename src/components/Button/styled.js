import styled, { css } from 'styled-components';


export const ButtonElement = styled.TouchableOpacity`
  background: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.light};
  border-radius: 5px;
  padding: 10px;
  align-items: center;

  ${props => props.appearance === 'primary' && css`
    background: ${props.theme.primary};
    border: 1px solid ${props => props.theme.primary};
  `}
`;
