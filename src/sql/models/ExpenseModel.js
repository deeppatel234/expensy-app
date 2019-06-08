import _groupBy from "lodash/groupBy";
import _pickBy from "lodash/pickBy";
import _keyBy from "lodash/keyBy";
import _isEmpty from "lodash/isEmpty";

import BasicModel from "../BasicModel";
import store from 'Redux/store';
import Redux from "Redux/ReduxRegistry";

export const TRANSACTION_TYPE = {
  INCOME: "income",
  EXPENSE: "expense",
  TRANSFER: "transfer"
};

class ExpenseModel extends BasicModel {
  tableName() {
    return "expense";
  }

  initFields() {
    return {
      type: "TEXT NOT NULL",
      amount: "REAL NOT NULL",
      description: "TEXT",
      wallet: "TEXT NOT NULL",
      toWallet: "TEXT",
      category: "TEXT NOT NULL",
      dateTime: "TEXT NOT NULL"
    };
  }

  createSync() {
    return Promise.resolve();
  }

  // calculate wallet balance when create transaction
  async create(data, sync) {
    const createdData = await super.create(data, sync);
    const { wallets } = store.getState();

    if (createdData.type === TRANSACTION_TYPE.TRANSFER) {
      const fromWallet = wallets[createdData.wallet];
      const toWallet = wallets[createdData.toWallet];

      fromWallet.balance = fromWallet.balance - createdData.amount;
      toWallet.balance = toWallet.balance + createdData.amount;

      Redux.get("wallet", "update")(fromWallet);
      Redux.get("wallet", "update")(toWallet);
    } else {
      const walletData = wallets[createdData.wallet];

      if (createdData.type === TRANSACTION_TYPE.EXPENSE) {
        walletData.balance -= createdData.amount;
      }
      if (createdData.type === TRANSACTION_TYPE.INCOME) {
        walletData.balance += createdData.amount;
      }
      Redux.get("wallet", "update")(walletData);
    }
    return createdData;
  }

  // calculate wallet balance after sync complete
  async calculateWalletBalance() {
    try {
      let localRecords = await this.db.executeSql(
        `SELECT wallet, toWallet, type, SUM(amount) as total from ${this.tableName()} GROUP BY wallet, toWallet, type`
      );
      const data = _groupBy(this.getRowData(localRecords), "wallet");
      const finalBalance = {};
      const { wallets } = store.getState();

      Object.keys(data).forEach((w) => {
        const { initialBalance } = wallets[w];
        finalBalance[w] = initialBalance;
        data[w].forEach(({ type, total, toWallet }) => {
          if (type === TRANSACTION_TYPE.EXPENSE || type === TRANSACTION_TYPE.TRANSFER) {
            finalBalance[w] -= total;
          }
          if (type === TRANSACTION_TYPE.INCOME) {
            finalBalance[w] += total;
          }
          if (type === TRANSACTION_TYPE.TRANSFER) {
            if (!finalBalance[toWallet]) {
              finalBalance[toWallet] = 0;
            }
            finalBalance[toWallet] += total;
          }
        });
      });
      if (!_isEmpty(finalBalance)) {
        await this.models.wallet.updateBalance(finalBalance);
      }
    } catch (err) {
      console.tron.log(err);
    }
  }

  async syncTable(updateStore, syncTime) {
    const sup = await super.syncTable(updateStore, syncTime);
    if(sup) {
      await this.calculateWalletBalance();
    }
    return sup;
  }

  async getTotalAmount() {
    const amounts = {};

    const types = Object.values(TRANSACTION_TYPE);
    for (let i = 0; i < types.length; i++) {
      let localRecords = await this.db.executeSql(
        `SELECT SUM(amount) as total from ${this.tableName()} WHERE type="${
          types[i]
        }"`
      );
      let records = this.getRowData(localRecords);
      amounts[types[i]] = (records && records.length) ? records[0].total : 0;
    }
    return amounts;
  }

  async getAmountByCategory(type) {
    let localRecords = await this.db.executeSql(
      `SELECT category, SUM(amount) as total from ${this.tableName()} WHERE type="${type}" GROUP BY category`
    );
    return this.getRowData(localRecords);
  }

  async getTransactionList(limit) {
    let localRecords = await this.db.executeSql(
      `SELECT * FROM ( SELECT * FROM ${this.tableName()} ORDER BY date(dateTime) DESC LIMIT ${limit}) ORDER BY date(dateTime) ASC;`
    );
    return this.getRowData(localRecords);
  }
}

export default ExpenseModel;
