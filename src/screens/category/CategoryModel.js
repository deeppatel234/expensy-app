import React from 'react';
import { connect } from 'react-redux';

import {
  Modal,
  TouchableHighlight,
} from 'react-native';

import TypoGraphy from 'Components/TypoGraphy';
import Avatar from 'Components/Avatar';
import Icon from 'Components/Icon';
import Header from 'Components/Header';

import IconList from 'Utils/IconList';

import { BLACK } from 'Src/theme';

import {
  Container,
  Heading,
  Content,
  ListWrapper,
  ListItem,
  ListText,
  SafeAreaView,
} from 'Src/globalStyle';

const CategoryModel = ({ visible, onSelect, onClose, categories }) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={visible}
    onRequestClose={onClose}
  >
    <SafeAreaView>
      <Container>
        <Heading>
          <Header text="Categories" />
        </Heading>
        <Content>
          <ListWrapper>
            {
              Object.values(categories).map((category) => (
                <TouchableHighlight key={category._id} onPress={() => onSelect(category)}>
                  <ListItem>
                    <Avatar>
                      <Icon type={IconList[category.icon].type} name={IconList[category.icon].name} color={BLACK} />
                    </Avatar>
                    <ListText><TypoGraphy>{category.name}</TypoGraphy></ListText>
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

// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(CategoryModel);
