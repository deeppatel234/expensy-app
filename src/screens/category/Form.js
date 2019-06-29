import React, { useState, useCallback } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import TextInput from "Components/TextInput";
import Avatar from "Components/Avatar";
import Footer from "Components/Footer";

import IconModal from "Screens/icon/IconModal";

import {
  Content,
  IconInputWrapper,
  RightInput
} from "Src/globalStyle";

const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Required")
});

const CategoryForm = ({ category, actionIcon, onSubmitForm }) => {
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
              group="category"
              onSelect={data => onSelectIcon(data, setFieldValue)}
              onClose={() => setIconModalVisible(false)}
            />
          </Content>
          <Footer actionIcon={actionIcon} onActionClick={handleSubmit} />
        </React.Fragment>
      )}
    </Formik>
  );
};

export default CategoryForm;
