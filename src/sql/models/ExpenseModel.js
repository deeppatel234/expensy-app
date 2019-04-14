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

  foreignKey() {
    return (`
      FOREIGN KEY (wallet) REFERENCES wallet(_id),
      FOREIGN KEY (toWallet) REFERENCES wallet(_id),
      FOREIGN KEY (category) REFERENCES category(_id)
    `);
  }
}

export default ExpenseModel;
