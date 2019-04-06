import React, { Component } from 'react';

import {
  NativeRouter,
  Route,
  Switch,
} from "react-router-native";

import { View } from 'react-native';

import PrivateRoute from './src/base/PrivateRoute';

import Login from './src/login';
import SignUp from './src/signup';
import Main from './src/Main';

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <View>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/" exact component={Main} />
          </Switch>
        </View>
      </NativeRouter>
    );
  }
}
