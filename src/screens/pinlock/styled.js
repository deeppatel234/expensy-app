import styled from 'styled-components';
import { FlexRow } from "Src/globalStyle";

export const Wrapper = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => props.theme.white};
  width: 100%;
  height: 100%;
`;

export const AppNameWrapper = styled.View`
  align-self: center;
  padding: 50px 0 20px 0;
`;

export const NumpadWrapper = styled.View`
  padding: 20px;
  margin-bottom: 20px;
`;

export const NumpadRow = styled(FlexRow)`
  justify-content: space-around;
  margin-top: 10px;
`;

export const Numpad = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 1px solid ${props => props.theme.gray};
`;

export const PinDisplay = styled(FlexRow)`
  align-self: center;
  margin-top: 10px;
  margin-bottom: 40px;
`;

export const Pin = styled.View`
  margin: 10px;
`;
