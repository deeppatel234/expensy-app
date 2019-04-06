import AsyncStorage from '@react-native-community/async-storage';

const KEYS = {
  AUTHTOKEN: 'authToken',
};

export default {
  async getToken() {
    await AsyncStorage.getItem(KEYS.AUTHTOKEN);
  },

  async setToken(token) {
    await AsyncStorage.setItem(KEYS.AUTHTOKEN, token);
  }
};
