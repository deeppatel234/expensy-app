import BasicModel from '../BasicModel';

class ExpenseModel extends BasicModel {
  tableName() {
    return 'expense';
  }

  initFields() {
    return {
      sid: 'TEXT UNIQUE',
      type: 'TEXT NOT NULL',
      amount: 'REAL NOT NULL',
      description: 'TEXT NOT NULL',
      paymentmethod: 'INTEGER NOT NULL',
      category: 'INTEGER NOT NULL',
      dateTime: 'TEXT NOT NULL',
    };
  }

  foreignKey() {
    return (`
      FOREIGN KEY (paymentmethod) REFERENCES paymentmethod(sid),
      FOREIGN KEY (category) REFERENCES category(sid)
    `);
  }
}

export default ExpenseModel;
