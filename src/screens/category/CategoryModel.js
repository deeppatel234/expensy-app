import React from 'react';
import { connect } from 'react-redux';

import {
  Modal,
  TouchableHighlight,
} from 'react-native';

import TypoGraphy from '../../components/TypoGraphy';
import Avatar from '../../components/Avatar';
import IconList from '../icon/IconList';

import {
  Container,
  Heading,
  Content,
  ListWrapper,
  ListItem,
  ListText,
} from '../../../globalStyle';

const CategoryModel = ({ visible, onSelect, categories }) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={visible}
  >
    <Container>
      <Heading>
        <TypoGraphy type="heading" appearance="primary">Categories</TypoGraphy>
      </Heading>
      <Content>
        <ListWrapper>
          {
            Object.values(categories).map((category) => (
              <TouchableHighlight key={category._id} onPress={() => onSelect(category)}>
                <ListItem>
                  <Avatar type={IconList[category.icon].type} name={IconList[category.icon].name} />
                  <ListText><TypoGraphy>{category.name}</TypoGraphy></ListText>
                </ListItem>
              </TouchableHighlight>
            ))
          }
        </ListWrapper>
      </Content>
    </Container>
  </Modal>
)

// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(CategoryModel);
