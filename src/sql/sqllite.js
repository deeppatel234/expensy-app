import { openDatabase, enablePromise } from 'react-native-sqlite-storage';


class SQLLite {
  constructor() {
    enablePromise(true);
    this.db = false;
  }

  connect() {
    return openDatabase({
      name: "ExpensyDatabase",
      location: "default"
    }).then((db) => {
      this.db = db;
    });
  }
}

export default new SQLLite();
