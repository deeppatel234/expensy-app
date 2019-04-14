import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Modal,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';


class CategoryModel extends Component {
  render() {
    const {
      visible,
      onSelect,
      categories,
    } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
      >
        <View>
          {
            Object.values(categories).map((category) => (
              <TouchableHighlight key={category._id} onPress={() => onSelect(category)}>
                <Text>{category.icon} - {category.name}</Text>
              </TouchableHighlight>
            ))
          }
        </View>
      </Modal>
    );
  }
}

// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(CategoryModel);
