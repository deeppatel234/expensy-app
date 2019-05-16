import React, { Component } from 'react';
import { connect } from 'react-redux';
import TouchID from 'react-native-touch-id';
import SplashLoading from "Screens/splash/SplashLoading";

class AppAuthentication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: !props.setting.fingerPrintLock,
      errorMessage: false,
    };
  }

  componentDidMount() {
    const { setting: { fingerPrintLock } } = this.props;
    if(fingerPrintLock) {
      TouchID.authenticate('')
        .then(() => {
          this.setState({ isAuthenticated: true });
        })
        .catch(() => {
          this.setState({ errorMessage: 'Authentication Error' });
        });
    }
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

// Maps state from store to props
const mapStateToProps = (state) => {
  return {
    setting: state.setting,
  };
};

export default connect(mapStateToProps)(AppAuthentication);
