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
    const data = await this.readAll();
    return data.length ? data[0] : false;
  }
}

export default UserModel;
