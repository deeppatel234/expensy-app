import React from 'react';

import {
  Modal,
  TouchableHighlight,
} from 'react-native';

import Avatar from 'Components/Avatar';
import Header from 'Components/Header';

import IconList from 'Utils/IconList';

import {
  Container,
  Heading,
  Content,
  SafeAreaView,
} from 'Src/globalStyle';

import { IconWrapper, Wrapper } from './styled';

const IconModel = ({ visible, onClose, onSelect }) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={visible}
    onRequestClose={onClose}
  >
    <SafeAreaView>
      <Container>
        <Heading>
          <Header text="Icons" />
        </Heading>
        <Content>
          <Wrapper>
            {
              Object.keys(IconList).map((key) => (
                <TouchableHighlight key={key} onPress={() => onSelect(key)}>
                  <IconWrapper>
                    <Avatar.Icon iconKey={key} />
                  </IconWrapper>
                </TouchableHighlight>
              ))
            }
          </Wrapper>
        </Content>
      </Container>
    </SafeAreaView>
  </Modal>
)

export default IconModel;
