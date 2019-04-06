import React, { Component } from 'react';

import { Text } from 'native-base';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: true
    };
  }

  render() {
    return (
      <Text>Hello Login</Text>
    );
  }
}

export default Login;
