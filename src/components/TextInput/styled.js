import styled from 'styled-components';

export const Input = styled.TextInput`
  background: ${props => props.theme.white};
  padding: 5px 10px;
  margin-bottom: 20px;
  border-bottom-color: ${props => props.theme.light};
  border-bottom-width: 1px;
`;
