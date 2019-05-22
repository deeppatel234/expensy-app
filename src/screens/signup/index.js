import React, { Component } from "react";
import { Redirect } from "react-router-native";
import { Formik } from "formik";
import * as Yup from 'yup';

import Request from "Base/Request";
import LocalStorage from "Base/LocalStorage";
import MemoryStorage from "Base/MemoryStorage";

import Typography from "Components/Typography";
import Loader from "Components/Loader";
import TextInput from "Components/TextInput";
import Button from "Components/Button";
import Link from "Components/Link";
import ReduxLoader from 'Base/ReduxLoader';

import { PRIMARY } from "Src/theme";

import {
  Wrapper,
  AppNameWrapper,
  LoginFormWrapper,
  FooterWrapper,
  LoginLink,
  SignUpWrapper,
  ErrorMessage
} from "./style";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required('Required'),
});

class SignUP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      errorMessage: false,
      redirectToApp: false
    };

    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm(values) {
    this.setState({ isLoading: true });

    const valueToSend = { ...values };
    delete valueToSend.confirmPassword;

    Request.api({
      model: "user",
      method: "signup",
      data: { record: valueToSend },
    })
      .then(({ token }) => {
        LocalStorage.setToken(token).then(() => {
          MemoryStorage.set("token", token);
          this.setState({
            errorMessage: token,
            isLoading: false,
            redirectToApp: true
          });
        });
      })
      .catch(err => {
        this.setState({ errorMessage: err.message, isLoading: false });
      });
  }

  render() {
    const {
      isLoading,
      errorMessage,
      redirectToApp
    } = this.state;

    if (redirectToApp) {
      return <Redirect to="/" />;
    }

    return (
      <ReduxLoader models={['network']}>
        <Wrapper>
          <AppNameWrapper>
            <Typography type="appLogo" color={PRIMARY}>
              Expensy
            </Typography>
          </AppNameWrapper>
          <SignUpWrapper>
            <Formik
              initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
              onSubmit={this.onSubmitForm}
              validationSchema={SignupSchema}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {props => (
                <React.Fragment>
                  <TextInput
                    placeholder="name"
                    onChangeText={props.handleChange("name")}
                    onBlur={props.handleBlur("name")}
                    value={props.values.name}
                    error={props.errors.name}
                  />
                  <TextInput
                    placeholder="email"
                    onChangeText={props.handleChange("email")}
                    onBlur={props.handleBlur("email")}
                    value={props.values.email}
                    error={props.errors.email}
                  />
                  <TextInput
                    secureTextEntry
                    placeholder="password"
                    onChangeText={props.handleChange("password")}
                    onBlur={props.handleBlur("password")}
                    value={props.values.password}
                    error={props.errors.password}
                  />
                  <TextInput
                    secureTextEntry
                    placeholder="confirm password"
                    onChangeText={props.handleChange("confirmPassword")}
                    onBlur={props.handleBlur("confirmPassword")}
                    value={props.values.confirmPassword}
                    error={props.errors.confirmPassword}
                  />
                  {isLoading ? (
                    <Loader size="large" />
                  ) : (
                    <Button
                      text="Signup"
                      appearance="primary"
                      onPress={props.handleSubmit}
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
            <Typography color={PRIMARY}>
              Your Personal expense manager
            </Typography>
          </FooterWrapper>
        </Wrapper>
      </ReduxLoader>
    );
  }
}

export default SignUP;
