import BasicModel from '../BasicModel';

class WalletModel extends BasicModel {
  tableName() {
    return 'wallet';
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

export default WalletModel;
