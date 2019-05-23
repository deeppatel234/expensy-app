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

import { light, dark } from "Src/theme";

import { SafeAreaView } from "Src/globalStyle";

const MainApp = () => (
  <AuthWrapper>
    <Main />
  </AuthWrapper>
);

const App = ({ isLightTheme }) => (
  <ThemeProvider theme={isLightTheme ? light : dark}>
    <AppAuthentication>
      <InitDatabase>
        <SafeAreaView>
          <NativeRouter>
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/" component={MainApp} />
            </Switch>
          </NativeRouter>
        </SafeAreaView>
      </InitDatabase>
    </AppAuthentication>
  </ThemeProvider>
);

// Maps state from store to props
const mapStateToProps = state => {
  return {
    isLightTheme: state.setting.isLightTheme
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
