import _pick from "lodash/pick";
import BasicModel from "../BasicModel";
import LocalStorage from "Base/LocalStorage";

class UserModel extends BasicModel {
  tableName() {
    return "user";
  }

  initFields() {
    return {
      name: "TEXT NOT NULL",
      email: "TEXT NOT NULL"
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

  async getUser() {
    let user;
    if (this.isConnected()) {
      try {
        user = await this.request.api({ model: "user", method: "myinfo" });
      } catch (err) {}
    }

    if (user) {
      await this.replaceOrCreate(user);
    } else {
      const data = await this.readAll();
      user = data.length ? data[0] : false;
    }

    return user;
  }

  async getUserSetting() {
    let setting = {};
    if (this.isConnected()) {
      try {
        setting = await this.request.api({ model: "setting", method: "get" });
      } catch (err) {}
    }

    let localSetting = await LocalStorage.getSettings();
    localSetting = localSetting ? JSON.parse(localSetting) : {};

    return { ...localSetting, ...setting };
  }

  async saveUserSetting(setting) {
    await LocalStorage.setSettings(setting);
    const settingToSave = ["currency", "isLightTheme"];

    if (this.isConnected()) {
      try {
        setting = await this.request.api({
          model: "setting",
          method: "save",
          data: { setting: _pick(setting, settingToSave) }
        });
      } catch (err) {}
    }
  }

  syncTable() {
    return Promise.resolve();
  }
}

export default UserModel;
