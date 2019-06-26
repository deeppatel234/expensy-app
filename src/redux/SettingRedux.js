import BaseRedux from "./BaseRedux";

const DEFAULT_SETTINGS = {
  isDrawerOpen: false,
  fingerPrintLock: false,
  pinLock: false,
  pin: false,
  isLightTheme: true,
  currency: 'INDIAN_RUPEE',
};

class SettingRedux extends BaseRedux {
  getConstants() {
    return {
      SETTING_FETCH_DATA_SUCCESS: "SETTING_FETCH_DATA_SUCCESS",
      CHANGE_MENU_DRAWER_VISIBILITY: "CHANGE_MENU_DRAWER_VISIBILITY",
      CHANGE_FINGERPRINT_LOCK: "CHANGE_FINGERPRINT_LOCK",
      CHANGE_PIN_LOCK: "CHANGE_PIN_LOCK",
      CHANGE_CURRENCY: "CHANGE_CURRENCY",
      CHANGE_THEME: "CHANGE_THEME"
    };
  }

  saveSetting(obj) {
    const { setting } = this.getState();
    return this.models.get('user').saveSetting({ ...setting, ...obj }, true);
  }

  syncComplete(updatedSetting) {
    const { setting } = this.getState();
    this.models.get('user').saveSetting({ ...setting, ...updatedSetting });
    this.dispatch(this.actions.fetchDataSuccess({ ...setting, ...updatedSetting }));
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
      changeCurrency(currency) {
        return dispatch => {
          dispatch({
            type: self.constants.CHANGE_CURRENCY,
            currency
          });
          self.saveSetting({ currency });
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
        return self.models
          .get("user")
          .getSetting()
          .then(setting => self.dispatch(self.actions.fetchDataSuccess(setting)));
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
          case self.constants.CHANGE_CURRENCY:
            return { ...state, currency: action.currency };
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
