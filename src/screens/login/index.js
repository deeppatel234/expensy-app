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

import { PRIMARY } from "Src/theme";
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


const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

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
            <Typography type="appLogo" color={PRIMARY}>
              Expensy
            </Typography>
          </AppNameWrapper>
          <LoginFormWrapper>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={this.onSubmitForm}
              validationSchema={LoginSchema}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {props => (
                <React.Fragment>
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
            <Typography color={PRIMARY}>
              Your Personal expense manager
            </Typography>
          </FooterWrapper>
        </Wrapper>
      </ReduxLoader>
    );
  }
}

export default Login;
