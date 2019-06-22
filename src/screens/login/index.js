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

import { PRIMARY } from "Src/theme";
import ReduxLoader from "Base/ReduxLoader";
import deviceInfo from "Utils/deviceInfo";

import {
  Wrapper,
  AppNameWrapper,
  LoginFormWrapper,
  FooterWrapper,
  SignUpLink,
  SignUpWrapper,
  ErrorMessage
} from "./styled";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().required("Required")
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [redirectToApp, setRedirectToApp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const onSubmitForm = useCallback(values => {
    setIsLoading(true);

    Request.api({
      model: "user",
      method: "login",
      data: { ...values, deviceInfo }
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
    return <Redirect to="/loginonboarding" />;
  }

  return (
    <ReduxLoader models={["network"]}>
      <Wrapper>
        <AppNameWrapper>
          <Typography type="appLogo" color={PRIMARY}>
            Expensy
          </Typography>
        </AppNameWrapper>
        <LoginFormWrapper>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={onSubmitForm}
            validationSchema={LoginSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({
              handleChange,
              handleBlur,
              values,
              errors,
              handleSubmit
            }) => (
              <React.Fragment>
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
                {isLoading ? (
                  <Loader size="large" />
                ) : (
                  <Button
                    text="Login"
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
        </LoginFormWrapper>
        <SignUpWrapper>
          <SignUpLink>
            <Typography color={PRIMARY}>Don't have an account</Typography>
          </SignUpLink>
          <Link to="/signup" text="Sign Up" borderRadius block />
        </SignUpWrapper>
        <FooterWrapper>
          <Typography color={PRIMARY}>Your Personal expense manager</Typography>
        </FooterWrapper>
      </Wrapper>
    </ReduxLoader>
  );
};

export default Login;
