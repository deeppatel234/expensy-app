import styled from 'styled-components';

export const ColorWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

export const ColorIcon = styled.TouchableOpacity`
  background: ${props => props.color || props.theme[props.appearance]};
  height: 35px;
  width: 35px;
  border-radius: 17;
  margin: ${props => props.margin || 0}px;
`;
