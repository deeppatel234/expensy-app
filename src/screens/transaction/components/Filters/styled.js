import styled from "styled-components";

import { FlexRow } from "Src/globalStyle";

export const Wrapper = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
`;

export const ModalWrapper = styled.TouchableWithoutFeedback`
`;

export const FilterWrapper = styled.View`
  position: absolute;
  bottom: 80;
  padding: 0 20px;
  background: ${props => props.theme.white};
  width: 100%;
`;

export const FilterBox = styled.View`
  border: 1px solid ${props => props.theme.lightGray};
  border-radius: 10px;
  padding: 10px;
`;

export const DateBadges = styled(FlexRow)`
  flex-wrap: wrap;
`;

export const FilterTitle = styled.View`
  margin: 7px 0;
`;

export const ShowFilterWrapper = styled(FlexRow)`
  margin-bottom: 10px;
`;

export const BadgeWrapper = styled(FlexRow)`
  margin-left: 10px;
  flex-wrap: wrap;
`;

export const BadgeSpace = styled.View`
  margin: 0 3px;
`;
