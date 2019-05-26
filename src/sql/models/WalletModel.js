import BasicModel from '../BasicModel';

export const WALLET_TYPES = {
  BANK: 'bank',
  CASH: 'cash',
};

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
