import React, { useCallback, useState } from "react";
import { Redirect } from "react-router-native";
import { Formik } from "formik";
import * as Yup from "yup";

import Request from "Base/Request";
import LocalStorage from "Base/LocalStorage";
import MemoryStorage from "Base/MemoryStorage";

import Typography from "Components/Typography";
import Loader from "Components/Loader";
import TextInput from "Components/TextInput";
import Button from "Components/Button";
import Link from "Components/Link";
import ReduxLoader from "Base/ReduxLoader";

import { PRIMARY } from "Src/theme";

import {
  Wrapper,
  AppNameWrapper,
  LoginFormWrapper,
  FooterWrapper,
  LoginLink,
  SignUpWrapper,
  ErrorMessage,
} from "./styled";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match")
    .required("Required")
});

const SignUP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [redirectToApp, setRedirectToApp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const onSubmitForm = useCallback(values => {
    setIsLoading(true);

    const valueToSend = { ...values };
    delete valueToSend.confirmPassword;

    Request.api({
      model: "user",
      method: "signup",
      data: { record: valueToSend }
    })
      .then(({ token }) => {
        LocalStorage.setToken(token).then(() => {
          MemoryStorage.set("token", token);
          setRedirectToApp(true);
        });
      })
      .catch(err => {
        setErrorMessage(err.message);
        setIsLoading(false);
      });
  }, []);

  if (redirectToApp) {
    return <Redirect to="/" />;
  }

  return (
    <ReduxLoader models={["network"]}>
      <Wrapper>
        <AppNameWrapper>
          <Typography type="appLogo" color={PRIMARY}>
            Expensy
          </Typography>
        </AppNameWrapper>
        <SignUpWrapper>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: ""
            }}
            onSubmit={onSubmitForm}
            validationSchema={SignupSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ handleChange, handleBlur, values, errors, handleSubmit }) => (
              <React.Fragment>
                <TextInput
                  placeholder="name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  error={errors.name}
                />
                <TextInput
                  placeholder="email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  error={errors.email}
                />
                <TextInput
                  secureTextEntry
                  placeholder="password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  error={errors.password}
                />
                <TextInput
                  secureTextEntry
                  placeholder="confirm password"
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                />
                {isLoading ? (
                  <Loader size="large" />
                ) : (
                  <Button
                    text="Signup"
                    appearance="primary"
                    onPress={handleSubmit}
                    borderRadius
                    block
                  />
                )}
              </React.Fragment>
            )}
          </Formik>
          {errorMessage && (
            <ErrorMessage>
              <Typography appearance="red">{errorMessage}</Typography>
            </ErrorMessage>
          )}
        </SignUpWrapper>
        <LoginFormWrapper>
          <LoginLink>
            <Typography color={PRIMARY}>already have an account</Typography>
          </LoginLink>
          <Link to="/login" text="Login" borderRadius block />
        </LoginFormWrapper>
        <FooterWrapper>
          <Typography color={PRIMARY}>Your Personal expense manager</Typography>
        </FooterWrapper>
      </Wrapper>
    </ReduxLoader>
  );
};

export default SignUP;
