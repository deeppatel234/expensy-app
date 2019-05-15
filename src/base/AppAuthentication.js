import React, { Component } from 'react';
import TouchID from 'react-native-touch-id';
import SplashLoading from "Screens/splash/SplashLoading";

class AppAuthentication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: true,
      errorMessage: false,
    };
  }

  componentDidMount() {
    TouchID.authenticate('to demo this react-native component')
      .then(success => {
        this.setState({ isAuthenticated: true });
      })
      .catch(error => {
        this.setState({ errorMessage: error });
      });
  }

  render() {
    const { isAuthenticated, errorMessage } = this.state;
    const { children } = this.props;

    if(isAuthenticated) {
      return children;
    }

    return <SplashLoading message={errorMessage} />;
  }
}

export default AppAuthentication;
