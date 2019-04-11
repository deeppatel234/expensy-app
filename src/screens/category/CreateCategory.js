import React, { Component } from "react";
import { connect } from 'react-redux';

import { Button, TextInput, View } from "react-native";
import { Formik } from "formik";

import Redux from '../../redux/ReduxRegistry';

class CreateCategory extends Component {
  render() {
    const { createCategory } = this.props;

    return (
      <View>
        <Formik
          initialValues={{ name: "my-name", icon: "my-icon" }}
          onSubmit={values => createCategory(values)}
        >
          {props => (
            <View>
              <TextInput
                onChangeText={props.handleChange("icon")}
                onBlur={props.handleBlur("icon")}
                value={props.values.icon}
              />
              <TextInput
                onChangeText={props.handleChange("name")}
                onBlur={props.handleBlur("name")}
                value={props.values.name}
              />
              <Button onPress={props.handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCategory: (category) => dispatch(Redux.get('categories', 'create')(category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory);
