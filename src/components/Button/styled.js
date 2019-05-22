import styled, { css } from 'styled-components';


export const ButtonElement = styled.TouchableOpacity`
  background: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.lightGray};
  padding: 10px 20px;
  align-items: center;

  ${props => !props.block && css`
    align-self: flex-start;
  `}

  ${props => props.borderRadius && css`
    border-radius: 30px;
  `}

  ${props => props.appearance === 'primary' && css`
    background: ${props.theme.primary};
    border: 1px solid ${props => props.theme.primary};
  `}
`;
