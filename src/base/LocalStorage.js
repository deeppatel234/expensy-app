import AsyncStorage from '@react-native-community/async-storage';

const KEYS = {
  AUTHTOKEN: 'authToken',
  DBCONFIG: 'dbconfig',
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

  getDBConfig() {
    return AsyncStorage.getItem(KEYS.DBCONFIG);
  },

  setDBConfig(config) {
    return AsyncStorage.setItem(KEYS.DBCONFIG, config);
  },
};
