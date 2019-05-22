import React from 'react';
import { connect } from 'react-redux';

import {
  TouchableHighlight,
} from 'react-native';

import Typography from 'Components/Typography';
import Avatar from 'Components/Avatar';
import Modal from 'Components/Modal';

import {
  Content,
  ListWrapper,
  ListItem,
  ListText,
} from 'Src/globalStyle';

const CategoryModal = ({ visible, onSelect, onClose, categories }) => (
  <Modal visible={visible} onClose={onClose} heading="Categories">
    <Content>
      <ListWrapper>
        {
          Object.values(categories).map((category) => (
            <TouchableHighlight key={category._id} onPress={() => onSelect(category)}>
              <ListItem>
                <Avatar.Icon iconKey={category.icon} />
                <ListText><Typography>{category.name}</Typography></ListText>
              </ListItem>
            </TouchableHighlight>
          ))
        }
      </ListWrapper>
    </Content>
  </Modal>
);

// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(CategoryModal);
