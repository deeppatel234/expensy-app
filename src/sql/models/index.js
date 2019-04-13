import Registry from '../../base/Registry';

import UserModel from './UserModel';
import CategoryModel from './CategoryModel';
import WalletModel from './WalletModel';
import ExpenseModel from './ExpenseModel';

class ModelRegistry extends Registry {
  initTables() {
    return Promise.all(Object.values(this.data).map(d => d.initTable()));
  }

  setDB() {
    Object.values(this.data).map(d => d.setDB());
  }

  updateTables(version) {
    const defs = [];
    Object.values(this.data).forEach((model) => {
      const func = model[`updateTable_V${version}`];
      if (func) {
        defs.push(func.call(model));
      }
    });
    return Promise.all(defs);
  }
}

const modelRegistry = new ModelRegistry();

modelRegistry.set('user', new UserModel());
modelRegistry.set('category', new CategoryModel());
modelRegistry.set('wallet', new WalletModel());
modelRegistry.set('expense', new ExpenseModel());

export default modelRegistry;
