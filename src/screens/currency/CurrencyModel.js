import React from 'react';

import {
  Modal,
  TouchableHighlight,
} from 'react-native';

import TypoGraphy from 'Components/TypoGraphy';
import Header from 'Components/Header';

import CurrencyCode from 'Utils/CurrencyCode';

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
        <Header text="Currency" />
      </Heading>
      <Content>
        <ListWrapper>
          {
            Object.keys(CurrencyCode).map((code) => (
              <TouchableHighlight key={code} onPress={() => onSelect(code)}>
                <ListItem>
                  <ListDetails>
                    <TypoGraphy>{CurrencyCode[code].name}</TypoGraphy>
                    <TypoGraphy type="small">{CurrencyCode[code].unicode}</TypoGraphy>
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
