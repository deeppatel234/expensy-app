import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import Modal from "Components/Modal";
import TextInput from "Components/TextInput";
import Button from "Components/Button";

import { Content, CenterButton } from "Src/globalStyle";

const PinSchema = Yup.object().shape({
  pin: Yup.string()
    .length(4, "Pin should be 4 characters")
    .required("Required"),
  confirmPin: Yup.string()
    .oneOf([Yup.ref("pin"), null], "Pin don't match")
    .required("Required")
});

const ChangePinSchema = Yup.object().shape({
  currentPin: Yup.string(),
  confirmCurrentPin: Yup.string()
    .length(4, "Pin should be 4 characters")
    .oneOf([Yup.ref("currentPin"), null], "wrong pin")
    .required("Required"),
  pin: Yup.string()
    .length(4, "Pin should be 4 characters")
    .required("Required"),
  confirmPin: Yup.string()
    .oneOf([Yup.ref("pin"), null], "Pin don't match")
    .required("Required")
});

const PinModal = ({
  visible,
  onSelect,
  onClose,
  isOpenFromFP,
  isChangePin,
  currentPin
}) => (
  <Modal
    visible={visible}
    onClose={onClose}
    heading={isChangePin ? "Change Pin" : "Set Pin"}
  >
    <Formik
      initialValues={{
        currentPin: currentPin,
        confirmCurrentPin: "",
        pin: "",
        confirmPin: ""
      }}
      onSubmit={val => onSelect(val, isOpenFromFP)}
      validationSchema={isChangePin ? ChangePinSchema : PinSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, values, errors, handleSubmit }) => (
        <Content>
          {isChangePin && (
            <TextInput
              secureTextEntry
              placeholder="current pin"
              onChangeText={handleChange("confirmCurrentPin")}
              onBlur={handleBlur("confirmCurrentPin")}
              keyboardType="numeric"
              value={values.confirmCurrentPin}
              error={errors.confirmCurrentPin}
            />
          )}
          <TextInput
            secureTextEntry
            placeholder="pin"
            onChangeText={handleChange("pin")}
            onBlur={handleBlur("pin")}
            keyboardType="numeric"
            value={values.pin}
            error={errors.pin}
          />
          <TextInput
            secureTextEntry
            placeholder="confirm pin"
            onChangeText={handleChange("confirmPin")}
            onBlur={handleBlur("confirmPin")}
            keyboardType="numeric"
            value={values.confirmPin}
            error={errors.confirmPin}
          />
          <CenterButton>
            <Button
              onPress={handleSubmit}
              appearance="primary"
              text="Save"
              borderRadius
            />
          </CenterButton>
        </Content>
      )}
    </Formik>
  </Modal>
);

export default PinModal;
