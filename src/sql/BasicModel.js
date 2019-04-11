import _pick from 'lodash/pick';
import SQLLite from './sqllite';


class BasicModel {

  setDB() {
    this.db = SQLLite.db;
    this.fields = {
      id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
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

  prepareSaveData(data) {
    if(data._id) {
      data.sid = data._id;
      delete data._id;
    }
    return _pick(data, Object.keys(this.fields));
  }

  prepareGetData(data) {
    if(data.sid) {
      data._id = data.sid;
      delete data.sid;
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

  /**
   * =================
   *   CRUD Methods
   * =================
   */

  create(data) {
    const createData = this.prepareSaveData(data);
    const { keysString, replaceString, values } = this.getKeyValue(createData);
    return this.db.executeSql(`INSERT INTO ${this.tableName()} (${keysString}) VALUES (${replaceString})`, values)
      .then((res) => {
        const row = res[0];
        if (row.rowsAffected && row.insertId) {
          return { id: row.insertId, ...data };
        }
        return {};
      });
  }

  replaceOrCreate(data) {
    const { keysString, replaceString, values } = this.getKeyValue(this.prepareSaveData(data));
    return this.db.executeSql(`REPLACE INTO ${this.tableName()} (${keysString}) VALUES (${replaceString});`, values);
  }

  readAll() {
    return new Promise(async (res, rej) => {
      try {
        const [data] = await this.db.executeSql(`SELECT * from ${this.tableName()}`);
        if (data.rows.length) {
          const resData = [];
          for (let i = 0; i < data.rows.length; ++i) {
            resData.push(this.prepareGetData(data.rows.item(i)));
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
    const setData = this.prepareSaveData(set);
    const whereData = this.prepareSaveData(where);

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
    const queryData = this.prepareSaveData(query);
    const queryList = [];
    Object.keys(queryData).forEach((key) => {
      queryList.push(`${key}='${queryData[key]}'`)
    });

    return this.db.executeSql(`DELETE FROM ${this.tableName()} WHERE ${queryList.join(' and ')}`);
  }
}

export default BasicModel;
