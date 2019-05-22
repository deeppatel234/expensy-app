import BaseRedux from "./BaseRedux";
import LocalStorage from "Base/LocalStorage";
import MemoryStorage from "Base/MemoryStorage";
import Models from "Models";

class UserRedux extends BaseRedux {
  async logoutUser() {
    await LocalStorage.clearStorage();
    MemoryStorage.clear();
    await Models.clearAllData();
    this.dispatch(this.actions.logout());
  }

  getConstants() {
    return {
      USER_FETCH_DATA_SUCCESS: "USER_FETCH_DATA_SUCCESS",
      USER_UPDATE_DATA: "USER_UPDATE_DATA",
      USER_LOGOUT: "USER_LOGOUT"
    };
  }

  getActions() {
    const self = this;
    return {
      logout() {
        return {
          type: self.constants.USER_LOGOUT
        };
      },
      fetchDataSuccess(user) {
        return {
          type: self.constants.USER_FETCH_DATA_SUCCESS,
          user
        };
      },
      update(user) {
        return {
          type: self.constants.USER_UPDATE_DATA,
          user
        };
      },
      fetch() {
        return self.models
          .get("user")
          .getUser()
          .then(user => self.dispatch(self.actions.fetchDataSuccess(user)));
      }
    };
  }

  getReducers() {
    const self = this;
    return {
      user(state = {}, action) {
        switch (action.type) {
          case self.constants.USER_FETCH_DATA_SUCCESS:
            return action.user;
          case self.constants.USER_UPDATE_DATA:
            return { ...state, ...action.user };
          default:
            return state;
        }
      }
    };
  }
}

export default UserRedux;
