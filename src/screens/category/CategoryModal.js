import React from "react";
import { connect } from "react-redux";

import Modal from "Components/Modal";

import CategoryPanel from "./components/CategoryPanel";

import { Content, ListWrapper } from "Src/globalStyle";

const CategoryModal = ({ visible, onSelect, onClose, categories }) => (
  <Modal visible={visible} onClose={onClose} heading="Categories">
    <Content>
      <ListWrapper>
        {Object.values(categories).map(category => (
          <CategoryPanel
            key={category._id}
            onPress={() => onSelect(category)}
            category={category}
          />
        ))}
      </ListWrapper>
    </Content>
  </Modal>
);

// Maps state from store to props
const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

export default connect(mapStateToProps)(CategoryModal);
