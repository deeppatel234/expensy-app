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

import { PRIMARY_COLOR } from "Src/theme";
import ReduxLoader from 'Base/ReduxLoader';

import {
  Wrapper,
  AppNameWrapper,
  LoginFormWrapper,
  FooterWrapper,
  SignUpLink,
  SignUpWrapper,
  ErrorMessage
} from "./style";

class Login extends Component {
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

    Request.api({
      model: "user",
      method: "login",
      data: values
    }).then(({ token }) => {
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
          <LoginFormWrapper>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={this.onSubmitForm}
            >
              {props => (
                <React.Fragment>
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
                  {isLoading ? (
                    <Loader size="large" />
                  ) : (
                    <Button
                      text="Login"
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
          </LoginFormWrapper>
          <SignUpWrapper>
            <SignUpLink>
              <TypoGraphy color={PRIMARY_COLOR}>Don't have an account</TypoGraphy>
            </SignUpLink>
            <Link to="/signup" text="Sign Up" borderRadius block />
          </SignUpWrapper>
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

export default Login;
