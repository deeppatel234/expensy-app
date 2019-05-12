import _pickBy from 'lodash/pickBy';
import _keyBy from 'lodash/keyBy';

import BasicModel from '../BasicModel';

export const EXPENSE_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

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

  async getTotalAmount() {
    const amounts = {};

    const types = Object.values(EXPENSE_TYPES);
    for(let i = 0 ; i < types.length; i++) {
      let localRecords = await this.db.executeSql(
        `SELECT SUM(amount) as total from ${this.tableName()} WHERE type="${types[i]}"`
      );
      let records = this.getRowData(localRecords);
      amounts[types[i]] = (records && records.length) ? records[0].total : 0;
    }
    return amounts;
  }
}

export default ExpenseModel;
