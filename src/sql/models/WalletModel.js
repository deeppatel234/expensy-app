import BasicModel from '../BasicModel';
import Redux from 'Redux/ReduxRegistry';

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
      balance: 'REAL DEFAULT 0',
      initialBalance: 'REAL DEFAULT 0',
    };
  }

  async updateBalance(finalBalance) {
    const sqlQueries = [];
    Object.keys(finalBalance).forEach((walletId) => {
      sqlQueries.push([`UPDATE ${this.tableName()} SET balance=${finalBalance[walletId]} WHERE _id="${walletId}"`]);
    });
    await this.db.sqlBatch(sqlQueries);
    const updatedRecord = await this.readAll();
    Redux.get(this.tableName()).syncComplete(updatedRecord);
    return true;
  }
}

export default WalletModel;
