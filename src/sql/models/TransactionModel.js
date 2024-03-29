import _groupBy from "lodash/groupBy";
import _pickBy from "lodash/pickBy";
import _keyBy from "lodash/keyBy";
import _isEmpty from "lodash/isEmpty";

import BasicModel from "../BasicModel";
import store from "Redux/store";
import Redux from "Redux/ReduxRegistry";

export const TRANSACTION_TYPE = {
  INCOME: "income",
  EXPENSE: "expense",
  TRANSFER: "transfer"
};

class TransactionModel extends BasicModel {
  tableName() {
    return "money_transaction";
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

  async delete(data) {
    await super.delete({ _id: data._id });

    if (data.type === TRANSACTION_TYPE.TRANSFER) {
      await this.calculateWalletBalance();
    } else {
      const { wallets } = store.getState();
      const balance = TRANSACTION_TYPE.EXPENSE
        ? wallets[data.wallet].balance + data.amount
        : wallets[data.wallet].balance - data.amount;

      await this.models.wallet.updateBalance({ [data.wallet]: balance });
    }
  }

  async update(set, where, data) {
    await super.update(set, where);
    if (set.toWallet !== data.toWallet) {
      await this.calculateWalletBalance();
    } else if (
      set.type !== data.type ||
      set.wallet !== data.wallet ||
      set.amount !== data.amount
    ) {
      const { wallets } = store.getState();

      if (data.type === TRANSACTION_TYPE.EXPENSE) {
        wallets[data.wallet].balance += data.amount;
      }
      if (data.type === TRANSACTION_TYPE.INCOME) {
        wallets[data.wallet].balance -= data.amount;
      }

      if (set.type === TRANSACTION_TYPE.EXPENSE) {
        wallets[set.wallet].balance -= set.amount;
      }
      if (set.type === TRANSACTION_TYPE.INCOME) {
        wallets[set.wallet].balance += set.amount;
      }
      const finalBalance = {};
      finalBalance[data.wallet] = wallets[data.wallet].balance;
      finalBalance[set.wallet] = wallets[set.wallet].balance;
      await this.models.wallet.updateBalance(finalBalance);
    }
  }

  // calculate wallet balance after sync complete
  async calculateWalletBalance() {
    try {
      let localRecords = await this.db.executeSql(
        `SELECT wallet, toWallet, type, SUM(amount) as total from ${this.tableName()} WHERE sync != "delete" GROUP BY wallet, toWallet, type`
      );
      const data = _groupBy(this.getRowData(localRecords), "wallet");
      const finalBalance = {};
      const { wallets } = store.getState();

      Object.keys(wallets).forEach(
        w => (finalBalance[w] = wallets[w].initialBalance)
      );

      Object.keys(data).forEach(w => {
        data[w].forEach(({ type, total, toWallet }) => {
          if (
            type === TRANSACTION_TYPE.EXPENSE ||
            type === TRANSACTION_TYPE.TRANSFER
          ) {
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
    if (sup) {
      await this.calculateWalletBalance();
    }
    return sup;
  }

  async getTotalAmount() {
    const amounts = {};

    const types = Object.values(TRANSACTION_TYPE);
    for (let i = 0; i < types.length; i++) {
      let localRecords = await this.db.executeSql(
        `SELECT SUM(amount) as total from ${this.tableName()} WHERE sync != "delete" AND type="${
          types[i]
        }"`
      );
      let records = this.getRowData(localRecords);
      amounts[types[i]] = records && records.length ? records[0].total : 0;
    }
    return amounts;
  }

  async getAmountByCategory(type) {
    let localRecords = await this.db.executeSql(
      `SELECT category, SUM(amount) as total from ${this.tableName()} WHERE type="${type}" AND sync != "delete" GROUP BY category`
    );
    return this.getRowData(localRecords);
  }

  async getTransactionList(limit) {
    let localRecords = await this.db.executeSql(
      `SELECT * FROM ( SELECT * FROM ${this.tableName()} WHERE sync != "delete" ORDER BY date(dateTime) DESC LIMIT ${limit}) ORDER BY date(dateTime) ASC;`
    );
    return this.getRowData(localRecords);
  }

  async filter(type, dates) {
    const { startDate, endDate } = dates;
    let localRecords = await this.db.executeSql(
      `SELECT * FROM ${this.tableName()} WHERE type IN (${type
        .map(t => `'${t}'`)
        .join(
          ","
        )}) AND sync != "delete" AND dateTime BETWEEN ${startDate} AND ${endDate}`
    );
    return this.getRowData(localRecords);
  }
}

export default TransactionModel;
