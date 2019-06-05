import styled from 'styled-components';
import { FlexRow } from "Src/globalStyle";

export const TransactionWrapper = styled.View`
  margin-bottom: 5px;
  padding: 3px;
  border-bottom-color: ${props => props.theme.lightGray};
  border-bottom-width: 1px;
`;

export const CardHeader = styled(FlexRow)`
  justify-content: space-between;
`;

export const CardContent = styled(CardHeader)`
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const LeftDetails = styled(FlexRow)`
`;

export const RightDetails = styled(FlexRow)`
`;

export const SubDetails = styled.View`
  margin-${props => props.type}: 10px;
`;

export const AmountText = styled.View`
  align-self: flex-end;
`;

export const TransferIcon = styled(FlexRow)`
  margin: 0 5px;
`;
