import AsyncStorage from '@react-native-community/async-storage';

const KEYS = {
  AUTHTOKEN: 'authToken',
};

export default {
  getToken() {
    return AsyncStorage.getItem(KEYS.AUTHTOKEN);
  },

  setToken(token) {
    return AsyncStorage.setItem(KEYS.AUTHTOKEN, token);
  },

  removeToken() {
    return AsyncStorage.removeItem(KEYS.AUTHTOKEN);
  },
};
