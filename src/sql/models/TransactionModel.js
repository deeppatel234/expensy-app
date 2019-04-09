import BasicModel from '../BasicModel';

class TransactionModel extends BasicModel {
  tableName() {
    return 'transaction';
  }

  initFields() {
    return {
      sid: 'TEXT UNIQUE',
      type: 'TEXT NOT NULL',
      amount: 'REAL NOT NULL',
      description: 'TEXT NOT NULL',
      paymentMethod: 'INTEGER NOT NULL',
      category: 'INTEGER NOT NULL',
      dateTime: 'TEXT NOT NULL',
    };
  }

  foreignKey() {
    return (`
      FOREIGN KEY (paymentMethod) REFERENCES paymentmethod(sid),
      FOREIGN KEY (category) REFERENCES category(sid)
    `);
  }
}

export default TransactionModel;
