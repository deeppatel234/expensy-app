import React, { Component } from "react";
import { connect } from "react-redux";
import TouchID from "react-native-touch-id";
import SplashLoading from "Screens/splash/SplashLoading";
import PinLock from "Screens/pinlock";

class AppAuthentication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: !props.setting.fingerPrintLock && !props.setting.pinLock,
      enablePinLock: false,
    };

    this.onPinPassed = this.onPinPassed.bind(this);
  }

  componentDidMount() {
    const {
      setting: { fingerPrintLock, pinLock, pin }
    } = this.props;
    if (fingerPrintLock) {
      return TouchID.authenticate("", {
        cancelText: "Use pin"
      })
        .then(() => {
          this.setState({ isAuthenticated: true });
        })
        .catch(() => {
          this.setState({
            enablePinLock: pin,
          });
        });
    }
    if (pinLock) {
      this.setState({
        enablePinLock: pin,
      });
    }
  }

  onPinPassed() {
    this.setState({ isAuthenticated: true });
  }

  render() {
    const { isAuthenticated, enablePinLock } = this.state;
    const { children } = this.props;

    if (isAuthenticated) {
      return children;
    }

    if (enablePinLock) {
      return <PinLock userPin={enablePinLock} onPassed={this.onPinPassed} />
    }

    return <SplashLoading />;
  }
}

// Maps state from store to props
const mapStateToProps = state => {
  return {
    setting: state.setting
  };
};

export default connect(mapStateToProps)(AppAuthentication);
