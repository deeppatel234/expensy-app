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
      paymentmethod: 'INTEGER NOT NULL',
      category: 'INTEGER NOT NULL',
      dateTime: 'TEXT NOT NULL',
    };
  }

  foreignKey() {
    return (`
      FOREIGN KEY (paymentmethod) REFERENCES paymentmethod(_id),
      FOREIGN KEY (category) REFERENCES category(_id)
    `);
  }
}

export default ExpenseModel;
