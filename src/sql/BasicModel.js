import sortId from 'shortid';
import _pick from 'lodash/pick';
import _pickBy from 'lodash/pickBy';
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
      sync: 'TEXT',
      mid: 'TEXT UNIQUE',
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
      data._id = sortId.generate();
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

  getRowData([res]) {
    if (res.rows.length) {
      const resData = [];
      for (let i = 0; i < res.rows.length; ++i) {
        resData.push(res.rows.item(i));
      }
      return resData;
    }
    return [];
  }

  buildEqualQuery(data, joinWith = ',') {
    const List = [];
    Object.keys(data).forEach((key) => {
      List.push(`${key}='${data[key]}'`)
    });
    return List.join(joinWith);
  }

  /**
   * =================
   *   CRUD Methods
   * =================
   */

  create(data, sync) {
    let createData = this.prepareSaveData(this.filterFields(data));
    createData = { ...createData, sync: 'create' };

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

  read(where) {
    const whereList = this.buildEqualQuery(this.filterFields(where));
    return new Promise(async (res, rej) => {
      try {
        const data = await this.db.executeSql(`SELECT * from ${this.tableName()} WHERE ${whereList}`);
        res(this.getRowData(data));
      } catch (err) {
        rej(err);
      }
    })
  }

  readAll() {
    return new Promise(async (res, rej) => {
      try {
        const data = await this.db.executeSql(`SELECT * from ${this.tableName()} where sync != "delete"`);
        res(this.getRowData(data));
      } catch (err) {
        rej(err);
      }
    })
  }

  async update(set, where) {
    const readData = await this.read(where);
    const isNewRecord = readData && readData.length && readData[0].sync === 'create';

    if (!isNewRecord) {
      set.sync = 'update';
    }

    const setList = this.buildEqualQuery(this.filterFields(set));
    const whereList = this.buildEqualQuery(this.filterFields(where), ' and ');
    return this.db.executeSql(`UPDATE ${this.tableName()} SET ${setList} WHERE ${whereList}`);
  }

  async delete(where) {
    const filterQuery = this.filterFields(where);
    const readData = await this.read(filterQuery);
    const isNewRecord = readData && readData.length && readData[0].sync === 'create';

    const whereList = this.buildEqualQuery(filterQuery, ' and ');
    if (isNewRecord) {
      return this.db.executeSql(`DELETE FROM ${this.tableName()} WHERE ${whereList}`);
    }

    return this.db.executeSql(`UPDATE ${this.tableName()} SET sync="delete" WHERE ${whereList}`);
  }


  /**
   * Helper CRUD Methods
   */

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

  /**
   * =================
   *   Sync Methods
   * =================
   */

  async syncTable(updateStore, syncTime) {
    if (!this.isConnected()) {
      return true;
    }

    const time = syncTime[this.tableName()];

    let localRecords = await this.db.executeSql(`SELECT * from ${this.tableName()} WHERE sync != "1"`);
    localRecords = this.getRowData(localRecords);

    localRecords = localRecords.map(lr => _pickBy(lr));

    let syncResponse = await this.request.api({
      model: this.tableName(),
      method: 'sync',
      data: { records: localRecords, syncTime: time },
    });

    syncTime[this.tableName()] = syncResponse.syncTime;

    if(_isEmpty(syncResponse.records)) {
      return true;
    }

    await this.replaceOrCreateMulti(syncResponse.records, { sync: '1' });

    if (updateStore) {
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
    await this.update({ _id: createdData._id, sync: '1' }, { mid: record.mid });
    param._id = createdData._id;
  }
}

export default BasicModel;
