import Registry from '../../base/Registry';

import UserModel from './UserModel';

class ModelRegistry extends Registry {
  initTables() {
    return Promise.all(Object.values(this.data).map(d => d.initTable()));
  }
}

const modelRegistry = new ModelRegistry();

modelRegistry.set('user', new UserModel());

export default modelRegistry;
