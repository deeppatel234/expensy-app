import BaseRedux from "./BaseRedux";
import LocalStorage from "Base/LocalStorage";

const DEFAULT_SETTINGS = {
  isDrawerOpen: false,
  fingerPrintLock: false,
  pinLock: false,
  pin: false,
  isLightTheme: true
};

class SettingRedux extends BaseRedux {
  getConstants() {
    return {
      SETTING_FETCH_DATA_SUCCESS: "SETTING_FETCH_DATA_SUCCESS",
      CHANGE_MENU_DRAWER_VISIBILITY: "CHANGE_MENU_DRAWER_VISIBILITY",
      CHANGE_FINGERPRINT_LOCK: "CHANGE_FINGERPRINT_LOCK",
      CHANGE_PIN_LOCK: "CHANGE_PIN_LOCK",
      CHANGE_THEME: "CHANGE_THEME"
    };
  }

  saveSetting(obj) {
    const { setting } = this.getState();
    return LocalStorage.setSettings({ ...setting, ...obj });
  }

  getActions() {
    const self = this;
    return {
      fetchDataSuccess(setting) {
        return {
          type: self.constants.SETTING_FETCH_DATA_SUCCESS,
          setting
        };
      },
      changeTheme(isLightTheme) {
        return dispatch => {
          dispatch({
            type: self.constants.CHANGE_THEME,
            isLightTheme
          });
          self.saveSetting({ isLightTheme });
        };
      },
      changeMenuDrawerVisibility(isVisible) {
        return dispatch => {
          dispatch({
            type: self.constants.CHANGE_MENU_DRAWER_VISIBILITY,
            isVisible
          });
        };
      },
      changeFingerPrintLock(isLocked) {
        return dispatch => {
          dispatch({
            type: self.constants.CHANGE_FINGERPRINT_LOCK,
            isLocked
          });
          self.saveSetting({ fingerPrintLock: isLocked });
        };
      },
      changePinLock(isLocked, pin = false) {
        return dispatch => {
          dispatch({
            type: self.constants.CHANGE_PIN_LOCK,
            isLocked,
            pin
          });
          self.saveSetting({ pinLock: isLocked, pin });
        };
      },
      fetch() {
        return LocalStorage.getSettings().then(setting => {
          const settings = setting ? JSON.parse(setting) : DEFAULT_SETTINGS;
          self.dispatch(self.actions.fetchDataSuccess(settings));
        });
      }
    };
  }

  getReducers() {
    const self = this;
    return {
      setting(state = DEFAULT_SETTINGS, action) {
        switch (action.type) {
          case self.constants.SETTING_FETCH_DATA_SUCCESS:
            return { ...state, ...action.setting };
          case self.constants.CHANGE_THEME:
            return { ...state, isLightTheme: action.isLightTheme };
          case self.constants.CHANGE_MENU_DRAWER_VISIBILITY:
            return { ...state, isDrawerOpen: action.isVisible };
          case self.constants.CHANGE_FINGERPRINT_LOCK:
            return { ...state, fingerPrintLock: action.isLocked };
          case self.constants.CHANGE_PIN_LOCK:
            return { ...state, pinLock: action.isLocked, pin: action.pin };
          default:
            return state;
        }
      }
    };
  }
}

export default SettingRedux;
