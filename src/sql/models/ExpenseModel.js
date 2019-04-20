import _pickBy from 'lodash/pickBy';
import _keyBy from 'lodash/keyBy';

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

  // async syncTable(updateStore) {
  //   if (!this.isConnected()) {
  //     return true;
  //   }

  //   let localRecords = await this.db.executeSql(`SELECT * FROM ${this.tableName()} WHERE LENGTH(category)<= 20 or LENGTH(wallet)<= 20 or LENGTH(toWallet)<= 20`);

  //   localRecords = this.getRowData(localRecords);

  //   if (localRecords.length) {
  //     const mid = {
  //       category: localRecords.filter(lr => lr.category.length <= 20).map(lr => lr.category),
  //       wallet: localRecords.filter(lr => lr.wallet.length <= 20).map(lr => lr.wallet),
  //       toWallet: localRecords.filter(lr => lr.toWallet && lr.toWallet.length <= 20).map(lr => lr.toWallet),
  //     };

  //     const midKeys = Object.keys(mid.length);

  //     for(let field = 0; field < midKeys; field++) {
  //       const fieldKey = midKeys[0];

  //       if (mid[fieldKey].length) {
  //         let categoryList = await this.db.executeSql(`SELECT _id, mid FROM category WHERE mid IN (${mid[fieldKey].map(c => `'${c}'`).join(',')})`);
  //         categoryList = this.getRowData(categoryList);
  //         categoryList = _keyBy(categoryList, 'mid');
  
  //         for(let i = 0; i < mid[fieldKey].length; i++) {
  //           const categoryMID = mid[fieldKey][i];
  //           const recordToUpdate = localRecords.filter(lr => lr.category === categoryMID);
  
  //           for(let j = 0; j < recordToUpdate.length; j++) {
  //             await this.update({ category: categoryList[categoryMID]._id }, { _id: recordToUpdate[i]._id });
  //           }
  //         }
  //         console.tron.log('categoryList >>>>>>>>>>',categoryList);
  //       }
  //       console.tron.log('lenght data >>>>>>>>>>',localRecords, mid);
  //     }
  //     }


  //   return super.syncTable(updateStore);
  // }
}

export default ExpenseModel;
