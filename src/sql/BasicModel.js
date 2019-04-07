import SQLLite from './sqllite';

class BasicModel {
  initTable() {
    this.db = SQLLite.db;
    return this.createTable();
  }

  createTable() {
    this.fields = {
      id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
      ...this.initFields(),
    };

    const fieldString = Object.keys(this.fields).map(field => `${field} ${this.fields[field]}`).join(',');
    const createQuery = `CREATE TABLE IF NOT EXISTS ${this.tableName()}(${fieldString})`

    return SQLLite.db.executeSql(createQuery, []);
  }

  prepareSaveData(data) {
    if(data._id) {
      data.sid = data._id;
      delete data._id;
    }
    return data;
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
    const valueString = values.map(v => '?').join(',');

    return { keys: keys.join(','), valueString, values };
  }

  initFields() {
    throw new Error('Unimplemented Method: initFields');
  }

  tableName() {
    throw new Error('Unimplemented Method: tableName');
  }
}

export default BasicModel;
