import { openDatabase, enablePromise } from 'react-native-sqlite-storage';


class SQLLite {
  constructor() {
    enablePromise(true);
    this.db = false;
  }

  connect() {
    return openDatabase({
      name: "TestDatabase",
      location: "default"
    }).then((db) => {
      this.db = db;
      console.tron.log('Database connected');
    }).catch(err => console.tron.log('Error in connecting to database', err));
  }
}

export default new SQLLite();
