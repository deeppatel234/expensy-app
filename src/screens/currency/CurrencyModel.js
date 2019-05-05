import React from 'react';

import {
  Modal,
  TouchableHighlight,
} from 'react-native';

import TypoGraphy from '../../components/TypoGraphy';

import currencyCode from '../../utils/currencyCode';

import {
  Container,
  Heading,
  Content,
  ListWrapper,
  ListItem,
  ListDetails,
} from '../../../globalStyle';

const CurrencyModel = ({ visible, onSelect }) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={visible}
  >
    <Container>
      <Heading>
        <TypoGraphy type="heading" appearance="primary">Currency</TypoGraphy>
      </Heading>
      <Content>
        <ListWrapper>
          {
            Object.keys(currencyCode).map((code) => (
              <TouchableHighlight key={code} onPress={() => onSelect(code)}>
                <ListItem>
                  <ListDetails>
                    <TypoGraphy>{currencyCode[code].name}</TypoGraphy>
                    <TypoGraphy type="small">{currencyCode[code].unicode}</TypoGraphy>
                  </ListDetails>
                </ListItem>
              </TouchableHighlight>
            ))
          }
        </ListWrapper>
      </Content>
    </Container>
  </Modal>
)

export default CurrencyModel;
