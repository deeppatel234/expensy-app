import { openDatabase, enablePromise } from 'react-native-sqlite-storage';

// db.transaction(function(tx) {
//   tx.executeSql('SELECT * from messages', [], function (tx, data) {
//     for (let i = 0; i < data.rows.length; ++i) {
//       console.tron.log(data.rows.item(i));
//     }
//   });
// });

// db.transaction(function(tx) {
//   tx.executeSql('CREATE TABLE IF NOT EXISTS messages(id TEXT, text TEXT)', [], function () {
//     console.tron.log('table created');
//   });
// });

// db.transaction(function(tx) {
//   for (var i = 0; i < 300; i++) {
//     tx.executeSql('INSERT INTO messages VALUES (?, ?)', [i, 'Test message'], function(res) {
//       console.tron.log('record inserted created');
//     });
//   }
// });

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
