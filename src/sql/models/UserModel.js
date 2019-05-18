import BasicModel from '../BasicModel';

class UserModel extends BasicModel {
  tableName() {
    return 'user';
  }

  initFields() {
    return {
      name: 'TEXT NOT NULL',
      email: 'TEXT NOT NULL',
    };
  }

  readAll() {
    return new Promise(async (res, rej) => {
      try {
        const data = await this.db.executeSql(`SELECT * from ${this.tableName()};`);
        res(this.getRowData(data));
      } catch (err) {
        rej(err);
      }
    })
  }

  async getUser() {
    let user;
    if (this.isConnected()) {
      try {
        user = await this.request.api({ model: 'user', method: 'myinfo' });
      } catch(err) {}
    }

    if (user) {
      await this.replaceOrCreate(user);
    } else {
      const data = await this.readAll();
      user = data.length ? data[0] : false;
    }

    return user;
  }

  syncTable() {
    return Promise.resolve();
  }
}

export default UserModel;
