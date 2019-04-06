import React, { Component } from 'react';

import { Text } from 'react-native';

class SignUP extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: true
    };
  }

  render() {
    return (
      <Text>Hello SignUP</Text>
    );
  }
}

export default SignUP;
