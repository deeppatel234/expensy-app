import sortid from 'shortid';
import _pick from 'lodash/pick';
import SQLLite from './sqllite';

import Request from '../base/Request';
import store from '../redux/store';

class BasicModel {
  constructor() {
    this.request = Request;
  }

  setDB() {
    this.db = SQLLite.db;
    this.fields = {
      _id: 'TEXT PRIMARY KEY',
      sync: 'INTEGER DEFAULT 0',
      ...this.initFields(),
    };
  }

  initTable() {
    return this.createTable();
  }

  createTable() {
    let fieldString = Object.keys(this.fields).map(field => `${field} ${this.fields[field]}`).join(',');
    const foreignKey = this.foreignKey();
    if (foreignKey) {
      fieldString += `, ${foreignKey}`;
    }

    const createQuery = `CREATE TABLE IF NOT EXISTS ${this.tableName()} (${fieldString})`
    return SQLLite.db.executeSql(createQuery, []);
  }

  filterFields(data) {
    return _pick(data, Object.keys(this.fields));
  }

  prepareSaveData(data) {
    if (!data._id) {
      data._id = sortid.generate();
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

  foreignKey() {
    return false;
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

  async createSync(param) {
    if (!this.isConnected()) {
      return true;
    }

    const record = { ...param };
    const recordId = record._id;
    delete record._id;

    const createdData = await Request.api({
      model: this.tableName(),
      method: 'create',
      data: { record },
    });
    await this.update({ _id: createdData._id, sync: 1 }, { _id: recordId });
    param._id = createdData._id;
  }
}

export default BasicModel;
