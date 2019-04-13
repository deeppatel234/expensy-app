import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-native';

import { View, Text } from "react-native";

import Redux from "../../redux/ReduxRegistry";

const ViewCategory = ({ categories }) => (
  <View>
    {
      categories.map((category) => (
        <Text key={category._id}>{category.icon} - {category.name}</Text>
      ))
    }
    <Link to='/create-category'><Text>Create Category</Text></Link>
  </View>
);

// Maps state from store to props
const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteCategory: category => dispatch(Redux.get("categories", "delete")(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCategory);
