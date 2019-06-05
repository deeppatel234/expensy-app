import styled, { css } from 'styled-components';

export const FlexRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;

export const Container = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${props => props.theme.white};
  width: 100%;
  height: 100%;
`;

export const Heading = styled.View`
  z-index: 100;
  background-color: ${props => props.theme.white};
  padding-bottom: 15px;
`;

export const Content = styled.ScrollView`
  overflow: visible;
  flex:1;
  padding: 0 20px;
  margin-bottom: 30px;
`;

export const IconInputWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;

  ${props => props.center && css`
    align-items: center;
  `}
`;

export const RightInput = styled.View`
  margin-left: 20px;
  flex: 1;
`;

export const ListWrapper = styled.View`
`;

export const ListItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 10px;
`;

export const RightList = styled.View`
  margin-left: 20px;
`;

export const FormSpace = styled.View`
  margin-bottom: 20px;
`;

export const BorderBottom = styled.View`
  border-bottom-color: ${props => props.theme.lightGray};
  border-bottom-width: 1px;
`;
