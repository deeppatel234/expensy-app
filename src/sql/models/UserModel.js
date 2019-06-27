import _pick from "lodash/pick";
import BasicModel from "../BasicModel";
import redux from "Redux/ReduxRegistry";

const settingToSave = ["currency", "isLightTheme", "color"];

class UserModel extends BasicModel {
  tableName() {
    return "user";
  }

  initFields() {
    return {
      name: "TEXT NOT NULL",
      email: "TEXT NOT NULL",
      setting: "TEXT"
    };
  }

  readAll() {
    return new Promise(async (res, rej) => {
      try {
        const data = await this.db.executeSql(
          `SELECT * from ${this.tableName()};`
        );
        res(this.getRowData(data));
      } catch (err) {
        rej(err);
      }
    });
  }

  async updateTable_V2() {
    return this.db.executeSql(`
      ALTER TABLE ${this.tableName()} ADD COLUMN setting TEXT;
    `);
  }

  async getUser() {
    const data = await this.readAll();
    const { setting, ...rest } = data.length ? data[0] : {};
    return rest;
  }

  async getSetting() {
    const data = await this.readAll();
    const { setting } = data.length ? data[0] : false;
    return setting ? JSON.parse(setting) : {};
  }

  async saveSetting(setting, sync) {
    const settingsToUpdate = { ...setting, updatedTime: new Date().toUTCString() };

    if (sync && this.isConnected()) {
      try {
        await this.request.api({
          model: "setting",
          method: "save",
          data: { setting: _pick(setting, settingToSave) }
        });
      } catch (err) {}
    }

    await this.db.executeSql(
      `UPDATE ${this.tableName()} SET setting = '${JSON.stringify(settingsToUpdate)}'`
    );
  }

  async syncTable() {
    if (!this.isConnected()) {
      return Promise.reject();
    }

    const localSetting = await this.getSetting();
    const { user, setting } = await this.request.api({
      model: "user",
      method: "sync",
      data: { setting: _pick(localSetting, settingToSave) }
    });
    await this.replaceOrCreate({ ...user });
    redux.get("user").syncComplete(user);
    redux.get("setting").syncComplete({ ...setting, updatedTime: setting.writeAt });
  }
}

export default UserModel;
