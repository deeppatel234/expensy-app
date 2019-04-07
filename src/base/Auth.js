import MemoryStorage from './MemoryStorage';
import LocalStorage from './LocalStorage';

class Auth {
  async isAuthenticated() {
    if (MemoryStorage.get('token')) {
      return Promise.resolve();
    }

    const authToken = await LocalStorage.getToken();
    if (!authToken) {
      return Promise.reject();
    }

    MemoryStorage.set('token', authToken);
    return Promise.resolve();
  }
}

export default new Auth();
