import _pickBy from 'lodash/pickBy';
import _keyBy from 'lodash/keyBy';

import BasicModel from '../BasicModel';

class ExpenseModel extends BasicModel {
  tableName() {
    return 'expense';
  }

  initFields() {
    return {
      type: 'TEXT NOT NULL',
      amount: 'REAL NOT NULL',
      description: 'TEXT NOT NULL',
      wallet: 'TEXT NOT NULL',
      toWallet: 'TEXT',
      category: 'TEXT NOT NULL',
      dateTime: 'TEXT NOT NULL',
    };
  }

  createSync() {
    return Promise.resolve();
  }
}

export default ExpenseModel;
