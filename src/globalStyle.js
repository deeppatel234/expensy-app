import styled, { css } from 'styled-components';
import Typography from 'Components/Typography';

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

export const ListWrapper = styled.View`
`;

export const ListItem = styled.View`
  padding: 15px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ListText = styled(Typography)`
  margin-left: 20px;
`;

export const ListDetails = styled.View`
  margin-left: 20px;
`;

export const IconInputWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  ${props => props.center && css`
    align-items: center;
  `}
`;

export const LeftIcon = styled.View`
  margin-right: 20px;
`;

export const RightInput = styled.View`
  flex: 1;
`;

export const FormSpace = styled.View`
  margin-bottom: 20px;
`;

export const BorderBottom = styled.View`
  border-bottom-color: ${props => props.theme.lightGray};
  border-bottom-width: 1px;
`;
