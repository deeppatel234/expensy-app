import styled, { css } from 'styled-components';

export const WidgetWrapper = styled.View`
  border-color: ${props => props.theme.light};
  border-width: 1px;
  padding: 10px;
`;

export const Details = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Line = styled.View`
  border-bottom-color: ${props => props.theme.light};
  border-bottom-width: 1px;
  margin: 10px 0;
`;

export const WidgetTitle = styled.View`
  margin-bottom: 10px;
`;
