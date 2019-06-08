import styled from 'styled-components';

export const BadgeWrapper = styled.View`
  padding: 2px 7px;
  border-radius: 30px;
  align-self: flex-start;
  background: ${props => props.theme[props.appearance]};
`;
