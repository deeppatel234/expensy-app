import BasicModel from '../BasicModel';

class PaymentMethodModel extends BasicModel {
  tableName() {
    return 'paymentmethod';
  }

  initFields() {
    return {
      name: 'TEXT NOT NULL',
      type: 'TEXT NOT NULL',
      icon: 'TEXT NOT NULL',
      balance: 'REAL NOT NULL',
    };
  }
}

export default PaymentMethodModel;
