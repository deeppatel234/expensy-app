import React, { Component } from 'react';

import {
  NativeRouter,
  Route,
  Switch,
} from "react-router-native";

import { Container } from 'native-base';

import PrivateRoute from './src/base/PrivateRoute';

import Login from './src/login';
import SignUp from './src/signup';
import Main from './src/Main';

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <Container>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/" exact component={Main} />
          </Switch>
        </Container>
      </NativeRouter>
    );
  }
}
