import React from "react";
import { NativeRouter, Route, Switch } from "react-router-native";

import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import InitDatabase from "Base/InitDatabase";
import AuthWrapper from "Base/AuthWrapper";

import AppAuthentication from "Base/AppAuthentication";
import Login from "Screens/login";
import SignUp from "Screens/signup";
import Main from "Src/Main";
import OnBoarding from "Screens/onboarding";

import getTheme from "Src/theme";
import ReduxLoader from "Base/ReduxLoader";
import StatusBar from "Components/StatusBar";

import { SafeAreaView } from "Src/globalStyle";

const MainApp = () => (
  <AuthWrapper>
    <ReduxLoader models={["setting"]}>
      <AppAuthentication>
        <Main />
      </AppAuthentication>
    </ReduxLoader>
  </AuthWrapper>
);

const SignUpOnBoarding = () => <OnBoarding type="signup" />;

const LoginOnBoarding = () => <OnBoarding type="login" />;

const App = ({ isLightTheme, color }) => (
  <ThemeProvider theme={getTheme(isLightTheme, color)}>
    <InitDatabase>
      <React.Fragment>
        <StatusBar />
        <SafeAreaView>
          <NativeRouter>
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/signuponboarding" component={SignUpOnBoarding} />
              <Route path="/loginonboarding" component={LoginOnBoarding} />
              <Route path="/" component={MainApp} />
            </Switch>
          </NativeRouter>
        </SafeAreaView>
      </React.Fragment>
    </InitDatabase>
  </ThemeProvider>
);

// Maps state from store to props
const mapStateToProps = state => {
  return {
    isLightTheme: state.setting.isLightTheme,
    color: state.setting.color
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
