import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import Redux from "Redux/ReduxRegistry";
import Header from "Components/Header";
import TextInput from "Components/TextInput";
import Avatar from "Components/Avatar";
import Footer from "Components/Footer";

import IconModal from "Screens/icon/IconModal";

import {
  Container,
  Heading,
  Content,
  IconInputWrapper,
  RightInput
} from "Src/globalStyle";

const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Required")
});

const CreateCategory = ({ createCategory, history }) => {
  const [iconModalVisible, setIconModalVisible] = useState(false);

  const onSelectIcon = useCallback((data, setFieldValue) => {
    setFieldValue("icon", data);
    setIconModalVisible(false);
  }, []);

  const onSubmitForm = useCallback(values => {
    createCategory(values).then(() => history.goBack());
  }, []);

  return (
    <Container>
      <Heading>
        <Header text="Add Category" />
      </Heading>
      <Formik
        initialValues={{ icon: "PLACEHOLDER" }}
        onSubmit={onSubmitForm}
        validationSchema={CategorySchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          handleSubmit,
          setFieldValue
        }) => (
          <React.Fragment>
            <Content>
              <IconInputWrapper>
                <Avatar.Icon iconKey={values.icon} onPress={() => setIconModalVisible(true)} />
                <RightInput>
                  <TextInput
                    placeholder="Category Name"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    error={errors.name}
                  />
                </RightInput>
              </IconInputWrapper>
              <IconModal
                visible={iconModalVisible}
                onSelect={data => onSelectIcon(data, setFieldValue)}
                onClose={() => setIconModalVisible(false)}
              />
            </Content>
            <Footer actionIcon="add" onActionClick={handleSubmit} />
          </React.Fragment>
        )}
      </Formik>
    </Container>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createCategory: category =>
      dispatch(Redux.get("category", "create")(category))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateCategory);
