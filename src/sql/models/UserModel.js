import BasicModel from '../BasicModel';

class UserModel extends BasicModel {
  tableName() {
    return 'user';
  }

  initFields() {
    return {
      firstname: 'TEXT NOT NULL',
      lastname: 'TEXT NOT NULL',
      username: 'TEXT NOT NULL',
      email: 'TEXT NOT NULL',
    };
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
}

export default UserModel;
