import styled from 'styled-components';
import TypoGraphy from './src/components/TypoGraphy';

export const Container = styled.View`
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 0 20px;
`;

export const Heading = styled.View`
  margin: 20px 0;
`;

export const Content = styled.ScrollView`
  flex:1;
`;

export const Footer = styled.View`
  margin: 20px 0;
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
