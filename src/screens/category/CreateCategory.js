import React, { Component } from "react";

import { Button, TextInput, View } from "react-native";
import { Formik } from "formik";

class CreateCategory extends Component {
  render() {
    return (
      <View>
        <Formik
          initialValues={{ name: "my-name", icon: "my-icon" }}
          onSubmit={values => console.tron.log(values)}
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

export default CreateCategory;
