import styled from "styled-components";

export const PickerWrapper = styled.View`
  margin-bottom: 20px;
  border-bottom-color: ${props => props.theme.lightGray};
  border-bottom-width: 1px;
`;

export const Picker = styled.Picker`
  color: ${props => props.color || props.theme[props.appearance]};
`;
