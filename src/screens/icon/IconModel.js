import React from 'react';

import {
  Modal,
  TouchableHighlight,
} from 'react-native';

import TypoGraphy from '../../components/TypoGraphy';
import Avatar from '../../components/Avatar';
import Icon from '../../components/Icon';

import IconList from './IconList';

import {
  Container,
  Heading,
  Content,
} from '../../../globalStyle';

import { IconWrapper, Wrapper } from './styled';

const IconModel = ({ visible, onSelect }) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={visible}
  >
    <Container>
      <Heading>
        <TypoGraphy type="heading" appearance="primary">Icons</TypoGraphy>
      </Heading>
      <Content>
        <Wrapper>
          {
            Object.keys(IconList).map((icon) => (
              <TouchableHighlight key={icon} onPress={() => onSelect(icon)}>
                <IconWrapper>
                  <Avatar>
                    <Icon type={IconList[icon].type} name={IconList[icon].name} />
                  </Avatar>
                </IconWrapper>
              </TouchableHighlight>
            ))
          }
        </Wrapper>
      </Content>
    </Container>
  </Modal>
)

export default IconModel;
