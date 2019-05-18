import React, { Component } from "react";
import { Redirect } from "react-router-native";
import { Formik } from "formik";

import Request from "Base/Request";
import LocalStorage from "Base/LocalStorage";
import MemoryStorage from "Base/MemoryStorage";

import TypoGraphy from "Components/TypoGraphy";
import Loader from "Components/Loader";
import TextInput from "Components/TextInput";
import Button from "Components/Button";
import Link from "Components/Link";
import ReduxLoader from 'Base/ReduxLoader';

import { PRIMARY_COLOR } from "Src/theme";

import {
  Wrapper,
  AppNameWrapper,
  LoginFormWrapper,
  FooterWrapper,
  LoginLink,
  SignUpWrapper,
  ErrorMessage
} from "./style";

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
            <TypoGraphy type="appLogo" color={PRIMARY_COLOR}>
              Expensy
            </TypoGraphy>
          </AppNameWrapper>
          <SignUpWrapper>
            <Formik
              initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
              onSubmit={this.onSubmitForm}
            >
              {props => (
                <React.Fragment>
                  <TextInput
                    placeholder="name"
                    onChangeText={props.handleChange("name")}
                    onBlur={props.handleBlur("name")}
                    value={props.values.name}
                  />
                  <TextInput
                    placeholder="email"
                    onChangeText={props.handleChange("email")}
                    onBlur={props.handleBlur("email")}
                    value={props.values.email}
                  />
                  <TextInput
                    secureTextEntry
                    placeholder="password"
                    onChangeText={props.handleChange("password")}
                    onBlur={props.handleBlur("password")}
                    value={props.values.password}
                  />
                  <TextInput
                    secureTextEntry
                    placeholder="confirm password"
                    onChangeText={props.handleChange("confirmPassword")}
                    onBlur={props.handleBlur("confirmPassword")}
                    value={props.values.confirmPassword}
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
                <TypoGraphy appearance="danger">{errorMessage}</TypoGraphy>
              </ErrorMessage>
            )}
          </SignUpWrapper>
          <LoginFormWrapper>
            <LoginLink>
              <TypoGraphy color={PRIMARY_COLOR}>already have an account</TypoGraphy>
            </LoginLink>
            <Link to="/login" text="Login" borderRadius block />
          </LoginFormWrapper>
          <FooterWrapper>
            <TypoGraphy color={PRIMARY_COLOR}>
              Your Personal expense manager
            </TypoGraphy>
          </FooterWrapper>
        </Wrapper>
      </ReduxLoader>
    );
  }
}

export default SignUP;
