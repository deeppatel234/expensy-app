import LocalStorage from 'Base/LocalStorage';
import ModelRegistry from 'Models';

class DBConfig {
  constructor() {
    this.DB_VERSION = 1;
  }

  async init() {
    const DEFAULT_CONFIG = { dbVersion: this.DB_VERSION, tableCreated: false };

    const storedConfig = await LocalStorage.getDBConfig();
    const dbConfig = storedConfig ? JSON.parse(storedConfig) : DEFAULT_CONFIG;

    ModelRegistry.setDB();

    if (!dbConfig.tableCreated) {
      await ModelRegistry.initTables();
    }

    if (dbConfig.dbVersion !== this.DB_VERSION) {
      for (let v = dbConfig.dbVersion + 1; v <= this.DB_VERSION; v++) {
        await ModelRegistry.updateTables(v);
      }
    }

    await LocalStorage.setDBConfig(JSON.stringify({
      dbVersion: this.DB_VERSION,
      tableCreated: true,
    }))

    return Promise.resolve();
  }
}

export default new DBConfig();
