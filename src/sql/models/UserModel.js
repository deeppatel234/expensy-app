import BasicModel from '../BasicModel';

class UserModel extends BasicModel {
  tableName() {
    return 'user';
  }

  initFields() {
    return {
      sid: 'TEXT UNIQUE',
      firstname: 'TEXT NOT NULL',
      lastname: 'TEXT NOT NULL',
      username: 'TEXT NOT NULL',
      email: 'TEXT NOT NULL',
    };
  }

  async getUser() {
    const [res] = await this.db.executeSql(`SELECT * from ${this.tableName()}`);
    if (res.rows.length) {
      return this.prepareGetData(res.rows.item(0));
    }
    return false;
  }

  saveUser(user) {
    const { keys, values, valueString } = this.getKeyValue(this.prepareSaveData(user));
    return this.db.executeSql(`REPLACE INTO ${this.tableName()} (${keys}) VALUES (${valueString});`, values);
  }
}

export default UserModel;
