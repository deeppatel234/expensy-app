import BaseRedux from './BaseRedux';

const DEFAULT_SETTINGS = {
  isDrawerOpen: false,
};

class SettingRedux extends BaseRedux {
  getConstants() {
    return {
      CHANGE_MENU_DRAWER_VISIBILITY: 'CHANGE_MENU_DRAWER_VISIBILITY',
    };
  }

  getActions() {
    const self = this;
    return {
      changeMenuDrawerVisibility(isVisible) {
        return {
          type: self.constants.CHANGE_MENU_DRAWER_VISIBILITY,
          isVisible,
        };
      },
    };
  }

  getReducers() {
    const self = this;
    return {
      setting(state = DEFAULT_SETTINGS, action) {
        switch (action.type) {
          case self.constants.CHANGE_MENU_DRAWER_VISIBILITY:
            return { ...state, isDrawerOpen: action.isVisible };
          default:
            return state;
        }
      },
    };
  }
}

export default SettingRedux;
