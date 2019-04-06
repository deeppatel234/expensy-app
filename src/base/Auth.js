import Request from './Request';
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
    const { isValid } = await Request.api({
      model: 'user',
      method: 'varify',
      data: {
        token: authToken,
      },
    });;
    MemoryStorage.set('token', isValid ? authToken : false);
    return isValid ? Promise.resolve() : Promise.reject();
  }
}

export default new Auth();
