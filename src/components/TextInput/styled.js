import styled from "styled-components";

export const InputWrapper = styled.View`
  margin-bottom: 15px;
`;

export const Error = styled.View`
  margin-top: 5px;
`;

export const Input = styled.TextInput`
  background: ${props => props.theme.white};
  padding: 5px 10px;
  border-bottom-color: ${props =>
    props.error ? props.theme.red : props.theme.lightGray};
  border-bottom-width: 1px;
`;
