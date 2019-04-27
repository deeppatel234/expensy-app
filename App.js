import React, { Component } from 'react';

import {
  NativeRouter,
  Route,
  Switch,
} from "react-router-native";

import { ThemeProvider } from 'styled-components';

import { View, Text } from 'react-native';

import { Provider } from 'react-redux';
import store from './src/redux/store';

import PrivateRoute from './src/base/PrivateRoute';
import SQLLite from './src/sql/sqllite';
import DBConfig from './src/sql/DBConfig';

import Login from './src/screens/login';
import SignUp from './src/screens/signup';
import Main from './src/Main';

import theme from './src/theme';

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
      .then(() => {
        DBConfig.init().then(() => {
          this.setState({ isLoading: false })
        }).catch(() => this.setState({ isLoading: false, errorMessage: 'Error in creating tables' }))
      }).catch(() => this.setState({ isLoading: false, errorMessage: 'Error in connecting to database' }))
  }

  render() {
    const { isLoading, errorMessage } = this.state;

    if (isLoading) {
      return <Text>connecting to database...</Text>
    }

    if (errorMessage) {
      return <Text>{errorMessage}</Text>
    }

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <NativeRouter>
            <View>
              <Switch>
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/" exact component={Main} />
              </Switch>
            </View>
          </NativeRouter>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
