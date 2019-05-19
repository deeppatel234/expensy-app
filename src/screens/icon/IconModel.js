import React from 'react';

import {
  Modal,
  TouchableHighlight,
} from 'react-native';

import Avatar from 'Components/Avatar';
import Icon from 'Components/Icon';
import Header from 'Components/Header';

import IconList from 'Utils/IconList';

import { BLACK } from 'Src/theme';

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
              Object.keys(IconList).map((icon) => (
                <TouchableHighlight key={icon} onPress={() => onSelect(icon)}>
                  <IconWrapper>
                    <Avatar>
                      <Icon type={IconList[icon].type} name={IconList[icon].name} color={BLACK} />
                    </Avatar>
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
