import styled from 'styled-components';

import { FlexRow } from "Src/globalStyle";

export const Wrapper = styled.View`
  border-color: ${props => props.theme.lightGray};
  border-width: 1px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const Details = styled(FlexRow)`
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const Line = styled.View`
  border-bottom-color: ${props => props.theme.lightGray};
  border-bottom-width: 1px;
  margin: 5px 0;
`;
