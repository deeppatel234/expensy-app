import React, { Component } from 'react';

import {
  NativeRouter,
  Route,
  Switch,
} from "react-router-native";

import { ThemeProvider } from 'styled-components';

import { Provider } from 'react-redux';
import store from 'Redux/store';

import PrivateRoute from 'Base/PrivateRoute';
import SQLLite from 'Src/sql/sqllite';
import DBConfig from 'Src/sql/DBConfig';

import Login from 'Screens/login';
import SignUp from 'Screens/signup';
import Main from 'Src/Main';
import SplashLoading from "Screens/splash/SplashLoading";

import theme from 'Src/theme';

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

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <React.Fragment>
            {
              isLoading && <SplashLoading message="Connecting to database" />
            }
            {
              errorMessage && <SplashLoading message={errorMessage} />
            }
            {
              (!isLoading && !errorMessage) && (
                <NativeRouter>
                  <Switch>
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/" exact component={Main} />
                  </Switch>
                </NativeRouter>
              )
            }
          </React.Fragment>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
