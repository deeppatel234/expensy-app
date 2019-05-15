import React, { Component } from "react";

import { NativeRouter, Route, Switch } from "react-router-native";

import PrivateRoute from "Base/PrivateRoute";
import SQLLite from "Src/sql/sqllite";
import DBConfig from "Src/sql/DBConfig";

import Login from "Screens/login";
import SignUp from "Screens/signup";
import Main from "Src/Main";
import SplashLoading from "Screens/splash/SplashLoading";

class Start extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      errorMessage: false
    };
  }

  componentDidMount() {
    SQLLite.connect()
      .then(() => {
        DBConfig.init()
          .then(() => {
            this.setState({ isLoading: false });
          })
          .catch(() =>
            this.setState({
              isLoading: false,
              errorMessage: "Error in creating tables"
            })
          );
      })
      .catch(() =>
        this.setState({
          isLoading: false,
          errorMessage: "Error in connecting to database"
        })
      );
  }

  render() {
    const { isLoading, errorMessage } = this.state;

    if (isLoading) {
      return <SplashLoading message="Connecting to database" />;
    }

    if (errorMessage) {
      return <SplashLoading message={errorMessage} />;
    }

    return (
      <NativeRouter>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" exact component={Main} />
        </Switch>
      </NativeRouter>
    );
  }
}

export default Start;
