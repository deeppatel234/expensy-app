import AsyncStorage from '@react-native-community/async-storage';

const KEYS = {
  AUTH_TOKEN: 'authToken',
  DB_CONFIG: 'dbConfig',
  LAST_SYNC: 'lastSync',
};

export default {
  getToken() {
    return AsyncStorage.getItem(KEYS.AUTH_TOKEN);
  },

  setToken(token) {
    return AsyncStorage.setItem(KEYS.AUTH_TOKEN, token);
  },

  removeToken() {
    return AsyncStorage.removeItem(KEYS.AUTH_TOKEN);
  },

  getDBConfig() {
    return AsyncStorage.getItem(KEYS.DB_CONFIG);
  },

  setDBConfig(config) {
    return AsyncStorage.setItem(KEYS.DB_CONFIG, config);
  },

  setSyncTime(obj) {
    return AsyncStorage.setItem(KEYS.LAST_SYNC, JSON.stringify(obj));
  },

  async getLastSync() {
    const obj = await AsyncStorage.getItem(KEYS.LAST_SYNC);
    return obj ? JSON.parse(obj) : {};
  },
};
