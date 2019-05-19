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
  SafeAreaView,
} from 'Src/globalStyle';

const CurrencyModel = ({ visible, onClose, onSelect }) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={visible}
    onRequestClose={onClose}
  >
    <SafeAreaView>
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
    </SafeAreaView>
  </Modal>
)

export default CurrencyModel;
