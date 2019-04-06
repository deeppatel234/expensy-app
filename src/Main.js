import React, { Component } from 'react';

import { Text } from 'react-native';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: true
    };
  }

  render() {
    return (
      <Text>Hello Main</Text>
    );
  }
};

export default Main;
