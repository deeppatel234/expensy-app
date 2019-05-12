import styled, { css } from 'styled-components';

export const WidgetWrapper = styled.View`
  border-color: ${props => props.theme.light};
  border-width: 1px;
  padding: 10px;
  margin: 5px;
`;

export const Details = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

export const Line = styled.View`
  border-bottom-color: ${props => props.theme.light};
  border-bottom-width: 1px;
  margin: 10px 0;
`;

export const WidgetTitle = styled.View`
  margin-bottom: 10px;
`;

export const LeftDetails = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RightDetails = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IconWrapper = styled.View`
  margin-${props => props.marginPosition}: 10px;
`;

export const SubDetails = styled.View`
`;
