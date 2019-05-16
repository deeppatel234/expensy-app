import styled from 'styled-components';

export const AvatarWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color || props.theme.light};
  height: 35px;
  width: 35px;
  border-radius: 17;
`;
