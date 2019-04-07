import Registry from '../../base/Registry';

import UserModel from './UserModel';
import CategoryModel from './CategoryModel';

class ModelRegistry extends Registry {
  initTables() {
    return Promise.all(Object.values(this.data).map(d => d.initTable()));
  }
}

const modelRegistry = new ModelRegistry();

modelRegistry.set('user', new UserModel());
modelRegistry.set('category', new CategoryModel());

export default modelRegistry;
