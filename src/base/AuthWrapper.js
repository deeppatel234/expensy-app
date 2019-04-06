import React, { Component } from 'react';
import { Redirect } from 'react-router-native';
import { Text } from 'native-base';

import Auth from './Auth';

/**
 * use to redirect to app if not authenticated otherwise open given component
 *
 * <AuthWrapper>
 *  This is rendered if authenticated
 * </AuthWrapper>
 */
class AuthWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    Auth.isAuthenticated().then(() => {
      this.setState({
        isLoading: true,
        isAuthenticated: true,
      });
    }).catch(() => {
      this.setState({
        isLoading: true,
        isAuthenticated: false,
      });
    });
  }

  render() {
    const { isLoading, isAuthenticated } = this.state;
    const { location } = this.props;

    if (!isLoading) {
      return <Text>Loading...</Text>;
    }

    if (isAuthenticated) {
      const { children } = this.props;
      return children;
    }

    return (
      <Redirect to={{ pathname: '/login', state: { from: location } }} />
    );
  }
}

export default AuthWrapper;
