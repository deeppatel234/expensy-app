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
import CategoryPanel from "./components/CategoryPanel";

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

const EditForm = ({ category, onSubmitForm }) => {
  const [iconModalVisible, setIconModalVisible] = useState(false);

  const onSelectIcon = useCallback((data, setFieldValue) => {
    setFieldValue("icon", data);
    setIconModalVisible(false);
  }, []);

  return (
    <Formik
      initialValues={category}
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
              <Avatar.Icon
                iconKey={values.icon}
                onPress={() => setIconModalVisible(true)}
              />
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
          <Footer actionIcon="save" onActionClick={handleSubmit} />
        </React.Fragment>
      )}
    </Formik>
  );
};

const EditCategory = ({ updateCategory, history, category }) => {
  const [editMode, setEditMode] = useState(false);

  const onSubmitForm = useCallback(values => {
    updateCategory(values).then(() => setEditMode(false));
  }, []);

  return (
    <Container>
      <Heading>
        <Header text="Category" />
      </Heading>
      {
        editMode && <EditForm category={category} onSubmitForm={onSubmitForm} />
      }
      {
        !editMode && (
          <React.Fragment>
            <Content>
              <CategoryPanel category={category} />
            </Content>
            <Footer actionIcon="edit" onActionClick={() => setEditMode(true)} />
          </React.Fragment>
        )
      }
    </Container>
  );
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  return {
    category: state.categories[id]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCategory: category =>
      dispatch(Redux.get("category", "update")(category))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCategory);
