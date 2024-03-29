import _sortBy from 'lodash/sortBy';

import Registry from 'Base/Registry';
import LocalStorage from 'Base/LocalStorage';
import MemoryStorage from "Base/MemoryStorage";

import UserModel from './UserModel';
import CategoryModel from './CategoryModel';
import WalletModel from './WalletModel';
import TransactionModel from './TransactionModel';

class ModelRegistry extends Registry {
  initTables() {
    return Promise.all(this.getValues().map(d => d.initTable()));
  }

  setDB() {
    this.getValues().map(d => d.setDB());
  }

  async syncTables(updateStore = true) {
    if (!MemoryStorage.get('token')) {
      return Promise.reject();
    }

    const syncTimes = await LocalStorage.getLastSync();
    const values = this.getValues();
    for(let i = 0; i < values.length; i++) {
      try {
        await values[i].syncTable(updateStore, syncTimes);
      } catch(err) {}
    }
    await LocalStorage.setSyncTime(syncTimes);
    return true;
  }

  set(seq, key, value) {
    value.sequence = seq;
    value.models = this.data;
    super.set(key, value);
  }

  getValues() {
    return _sortBy(Object.values(this.data), 'sequence');
  }

  updateTables(version) {
    const defs = [];
    this.getValues().forEach((model) => {
      const func = model[`updateTable_V${version}`];
      if (func) {
        defs.push(func.call(model));
      }
    });
    return Promise.all(defs);
  }

  clearAllData() {
    return Promise.all(this.getValues().map(d => d.clearData()));
  }
}

const modelRegistry = new ModelRegistry();

modelRegistry.set(1, 'user', new UserModel());
modelRegistry.set(2, 'category', new CategoryModel());
modelRegistry.set(3, 'wallet', new WalletModel());
modelRegistry.set(4, 'money_transaction', new TransactionModel());

export default modelRegistry;
