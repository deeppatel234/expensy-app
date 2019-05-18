import React, { Component } from 'react';

import {
  TextInput,
  View,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Redirect } from 'react-router-native';

import Request from 'Base/Request';
import LocalStorage from 'Base/LocalStorage';
import MemoryStorage from 'Base/MemoryStorage';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'deep',
      password: 'deep123',
      isLoading: false,
      errorMessage: false,
      redirectToApp: false,
    };

    this.onPressLogin = this.onPressLogin.bind(this);
  }

  onChangeText(text, name) {
    this.setState({ [name]: text });
  }

  onPressLogin() {
    const { username, password } = this.state;
    this.setState({ isLoading: true });

    Request.api({
      model: 'user',
      method: 'login',
      data: { username, password }
    }).then(({ token }) => {
      LocalStorage.setToken(token).then(() => {
        MemoryStorage.set('token', token);
        this.setState({ errorMessage: token, isLoading: false, redirectToApp: true });
      });
    }).catch((err) => {
      this.setState({ errorMessage: err.message, isLoading: false })
    });
  }

  render() {
    const {
      username,
      password,
      isLoading,
      errorMessage,
      redirectToApp,
    } = this.state;

    if (redirectToApp) {
      return <Redirect to="/" />
    }

    return (
      <View>
        <TextInput
          placeholder="username"
          value={username}
          onChangeText={(text) => this.onChangeText(text, 'username')}
        />
        <TextInput
          secureTextEntry
          placeholder="password"
          value={password}
          onChangeText={(text) => this.onChangeText(text, 'password')}
        />
        {
          isLoading
            ? <ActivityIndicator size="large" color="#0000ff" />
            : <Button title="Login" onPress={this.onPressLogin} />
        }
        {
          errorMessage && <Text>{errorMessage}</Text>
        }
      </View>
    );
  }
}

export default Login;
