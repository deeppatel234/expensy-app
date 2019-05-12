import styled, { css } from 'styled-components';
import TypoGraphy from 'Components/TypoGraphy';

export const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
};

export const Container = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  width: 100%;
  height: 100%;
`;

export const Heading = styled.View`
`;

export const Content = styled.ScrollView`
  flex:1;
`;

export const Footer = styled.View`
`;

export const ListWrapper = styled.View`
`;

export const ListItem = styled.View`
  padding: 15px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ListText = styled(TypoGraphy)`
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
  border-bottom-color: ${props => props.theme.light};
  border-bottom-width: 1px;
`;
