import React from "react";
import { connect } from "react-redux";

import { Formik } from "formik";

import Redux from "../../redux/ReduxRegistry";
import TypoGraphy from '../../components/TypoGraphy';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

import {
  Container,
  Heading,
  Content,
} from '../../../globalStyle';

const CreateCategory = ({ createCategory, history }) => (
  <Container>
    <Heading>
      <TypoGraphy type="heading" appearance="primary">Add Category</TypoGraphy>
    </Heading>
    <Content>
      <Formik
        // initialValues={{ name: "my-name", icon: "my-icon" }}
        onSubmit={values => createCategory(values).then(() => history.goBack())}
      >
        {props => (
          <React.Fragment>
            <TextInput
              placeholder="Enter Icon"
              onChangeText={props.handleChange("icon")}
              onBlur={props.handleBlur("icon")}
              value={props.values.icon}
            />
            <TextInput
              placeholder="Category Name"
              onChangeText={props.handleChange("name")}
              onBlur={props.handleBlur("name")}
              value={props.values.name}
            />
            <Button onPress={props.handleSubmit} text="Add" appearance="primary" />
          </React.Fragment>
        )}
      </Formik>
    </Content>
  </Container>
);

// Maps state from store to props
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCategory: category => dispatch(Redux.get("category", "create")(category))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCategory);
