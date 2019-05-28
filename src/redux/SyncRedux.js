import BaseRedux from "./BaseRedux";
import LocalStorage from "Base/LocalStorage";
import Models from "Models";

const DEFAULT_SYNC = {
  initSyncComplete: false,
  syncComplete: false,
};

class SyncRedux extends BaseRedux {
  getConstants() {
    return {
      INIT_SYNC: "INIT_SYNC",
      INIT_SYNC_COMPLETE: "INIT_SYNC_COMPLETE",
      SYNC_COMPLETE: "SYNC_COMPLETE",
    };
  }

  saveSync(obj) {
    return LocalStorage.setAppSync(obj);
  }

  getActions() {
    const self = this;
    return {
      initSync(sync) {
        return {
          type: self.constants.INIT_SYNC,
          sync,
        };
      },
      initSyncComplete() {
        return dispatch => {
          dispatch({
            type: self.constants.INIT_SYNC_COMPLETE,
          });
          self.saveSync({ initSyncComplete: true });
        };
      },
      syncComplete() {
        return {
          type: self.constants.SYNC_COMPLETE,
        };
      },
      fetch() {
        return LocalStorage.getAppSync().then(sync => {
          const storageSync = sync ? JSON.parse(sync) : DEFAULT_SYNC;
          self.dispatch(self.actions.initSync({ ...DEFAULT_SYNC, ...storageSync }));
        });
      },
      startInitSync() {
        return dispatch => Models.syncTables().then(() => dispatch(self.actions.initSyncComplete()))
      },
      startSync() {
        return dispatch => Models.syncTables().then(() => dispatch(self.actions.syncComplete()))
      },
    };
  }

  getReducers() {
    const self = this;
    return {
      sync(state = DEFAULT_SYNC, action) {
        switch (action.type) {
          case self.constants.INIT_SYNC:
            return { ...state, ...action.sync }
          case self.constants.INIT_SYNC_COMPLETE:
            return { ...state, initSyncComplete: true, syncComplete: true };
          case self.constants.SYNC_COMPLETE:
            return { ...state, syncComplete: true };
          default:
            return state;
        }
      }
    };
  }
}

export default SyncRedux;
