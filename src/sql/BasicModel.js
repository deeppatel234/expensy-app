import sortid from 'shortid';
import _pick from 'lodash/pick';
import _isEmpty from 'lodash/isEmpty';
import _omit from 'lodash/omit';
import SQLLite from './sqllite';

import Request from '../base/Request';
import store from '../redux/store';
import redux from '../redux/ReduxRegistry';

class BasicModel {
  constructor() {
    this.request = Request;
  }

  setDB() {
    this.db = SQLLite.db;
    this.fields = {
      _id: 'TEXT PRIMARY KEY',
      sync: 'INTEGER DEFAULT 0',
      mid: 'TEXT',
      ...this.initFields(),
    };
  }

  initTable() {
    return this.createTable();
  }

  createTable() {
    const fieldString = Object.keys(this.fields).map(field => `${field} ${this.fields[field]}`).join(',');
    const createQuery = `CREATE TABLE IF NOT EXISTS ${this.tableName()} (${fieldString})`
    return SQLLite.db.executeSql(createQuery, []);
  }

  filterFields(data) {
    return _pick(data, Object.keys(this.fields));
  }

  prepareSaveData(data) {
    if (!data._id) {
      data._id = sortid.generate();
      data.mid = data._id;
    }
    return data;
  }

  getKeyValue(data) {
    const keys = Object.keys(data);
    const values = keys.map(k => data[k]);

    return {
      keys,
      keysString: keys.join(','),
      values,
      valueString: values.join(','),
      replaceString: values.map(v => '?').join(','),
    };
  }

  initFields() {
    throw new Error('Unimplemented Method: initFields');
  }

  tableName() {
    throw new Error('Unimplemented Method: tableName');
  }

  isConnected() {
    const { isConnected } = store.getState().network;
    return isConnected;
  }

  /**
   * =================
   *   CRUD Methods
   * =================
   */

  create(data, sync) {
    const createData = this.prepareSaveData(this.filterFields(data));
    const { keysString, replaceString, values } = this.getKeyValue(createData);

    return this.db.executeSql(`INSERT INTO ${this.tableName()} (${keysString}) VALUES (${replaceString})`, values)
      .then(async () => {
        try {
          if (sync) {
            await this.createSync(createData);
          }
        } catch(err) {}
        return createData;
      });
  }

  updateIDs(datas) {
    const sqlQueries = [];
    datas.forEach((data) => {
      const setData = this.filterFields({ ...data, sync: 1 });
      const setList = [];
      Object.keys(setData).forEach((key) => {
        setList.push(`${key}='${setData[key]}'`)
      });

      sqlQueries.push(`UPDATE ${this.tableName()} SET ${setList.join(',')} WHERE mid='${data.mid}'`);
    });
    return this.db.sqlBatch(sqlQueries);
  }

  replaceOrCreate(data) {
    const { keysString, replaceString, values } = this.getKeyValue(this.prepareSaveData(this.filterFields(data)));
    return this.db.executeSql(`REPLACE INTO ${this.tableName()} (${keysString}) VALUES (${replaceString});`, values);
  }

  replaceOrCreateMulti(datas, extraData) {
    const sqlQueries = [];
    datas.forEach((data) => {
      const { keysString, replaceString, values } = this.getKeyValue(this.prepareSaveData(this.filterFields({ ...data, ...extraData })));
      sqlQueries.push([`REPLACE INTO ${this.tableName()} (${keysString}) VALUES (${replaceString});`, values]);
    });
    return this.db.sqlBatch(sqlQueries);
  }

  read(where) {
    const whereData = this.filterFields(where);

    const whereList = [];
    Object.keys(whereData).forEach((key) => {
      whereList.push(`${key}='${whereData[key]}'`)
    });

    return new Promise(async (res, rej) => {
      try {
        const [data] = await this.db.executeSql(`SELECT * from ${this.tableName()} WHERE ${whereList.join(' and ')}`);
        if (data.rows.length) {
          const resData = [];
          for (let i = 0; i < data.rows.length; ++i) {
            resData.push(data.rows.item(i));
          }
          res(resData);
        } else {
          res([]);
        }
      } catch (err) {
        rej(err);
      }
    })
  }

  readAll() {
    return new Promise(async (res, rej) => {
      try {
        const [data] = await this.db.executeSql(`SELECT * from ${this.tableName()}`);
        if (data.rows.length) {
          const resData = [];
          for (let i = 0; i < data.rows.length; ++i) {
            resData.push(data.rows.item(i));
          }
          res(resData);
        } else {
          res([]);
        }
      } catch (err) {
        rej(err);
      }
    })
  }

  update(set, where) {
    const setData = this.filterFields(set);
    const whereData = this.filterFields(where);

    const whereList = [];
    Object.keys(whereData).forEach((key) => {
      whereList.push(`${key}='${whereData[key]}'`)
    });

    const setList = [];
    Object.keys(setData).forEach((key) => {
      setList.push(`${key}='${setData[key]}'`)
    });

    return this.db.executeSql(`UPDATE ${this.tableName()} SET ${setList.join(',')} WHERE ${whereList.join(' and ')}`);
  }

  delete(query) {
    const queryData = this.filterFields(query);
    const queryList = [];
    Object.keys(queryData).forEach((key) => {
      queryList.push(`${key}='${queryData[key]}'`)
    });

    return this.db.executeSql(`DELETE FROM ${this.tableName()} WHERE ${queryList.join(' and ')}`);
  }

  /**
   * =================
   *   Sync Methods
   * =================
   */

  async syncTable(updateStore) {
    if (!this.isConnected()) {
      return true;
    }

    let records;
    try {
      records = await this.request.api({ model: this.tableName(), method: 'read', data: { own: true } });
      if (!_isEmpty(records)) {
        await this.replaceOrCreateMulti(records, { sync: 1 });
      }
    } catch(err) {}

    let dataToUpload;
    try {
      dataToUpload = await this.read({ sync: 0 });
      if (!_isEmpty(dataToUpload)) {
        const newCreatedRecords = await this.request.api({ model: this.tableName(), method: 'createmany', data: { records: dataToUpload } });
        await this.updateIDs(newCreatedRecords)
      }
    } catch(err) {}

    if (updateStore && (!_isEmpty(records) || !_isEmpty(dataToUpload))) {
      const updatedRecord = await this.readAll();
      redux.get(this.tableName()) && redux.get(this.tableName()).syncComplete(updatedRecord);
    }

    return true;
  }

  async createSync(param) {
    if (!this.isConnected()) {
      return true;
    }

    const record = { ...param };
    delete record._id;

    const createdData = await Request.api({
      model: this.tableName(),
      method: 'create',
      data: { record },
    });
    await this.update({ _id: createdData._id, sync: 1 }, { _id: record.mid });
    param._id = createdData._id;
  }
}

export default BasicModel;
