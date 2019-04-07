import React, { Component } from 'react';

import {
  NativeRouter,
  Route,
  Switch,
} from "react-router-native";

import { View, Text } from 'react-native';

import PrivateRoute from './src/base/PrivateRoute';
import SQLLite from './src/sql/sqllite';

import Login from './src/login';
import SignUp from './src/signup';
import Main from './src/Main';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      errorMessage: false,
    };
  }

  componentDidMount() {
    SQLLite.connect()
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false, errorMessage: 'Error in connecting to database' }))
  }

  render() {
    const { isLoading, errorMessage } = this.state;

    if (isLoading) {
      return <Text>Loading...</Text>
    }

    if (errorMessage) {
      return <Text>{errorMessage}</Text>
    }

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

export default App;
