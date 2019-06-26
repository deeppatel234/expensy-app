import _keyBy from "lodash/keyBy";
import BaseRedux from "./BaseRedux";

class WalletRedux extends BaseRedux {
  syncComplete(wallets) {
    this.dispatch(this.actions.fetchDataSuccess(wallets));
  }

  syncUpdate(category) {
    this.dispatch(this.actions.updateByMId(category));
  }

  getConstants() {
    return {
      WALLET_FETCH_DATA_SUCCESS: "WALLET_FETCH_DATA_SUCCESS",
      WALLET_CREATE_DATA: "WALLET_CREATE_DATA",
      WALLET_UPDATE_DATA: "WALLET_UPDATE_DATA",
      WALLET_UPDATE_MID_DATA: "WALLET_UPDATE_MID_DATA",
      WALLET_DELETE_DATA: "WALLET_DELETE_DATA"
    };
  }

  getActions() {
    const self = this;
    return {
      fetchDataSuccess(wallets) {
        return {
          type: self.constants.WALLET_FETCH_DATA_SUCCESS,
          wallets
        };
      },
      createSuccess(wallet) {
        return {
          type: self.constants.WALLET_CREATE_DATA,
          wallet
        };
      },
      updateSuccess(wallet) {
        return {
          type: self.constants.WALLET_UPDATE_DATA,
          wallet
        };
      },
      updateByMId(wallet) {
        return {
          type: self.constants.WALLET_UPDATE_MID_DATA,
          wallet
        };
      },
      create(wallet) {
        return dispatch => {
          return new Promise((resolve, reject) => {
            self.models
              .get("wallet")
              .create(wallet)
              .then(dbRes => {
                dispatch(self.actions.createSuccess(dbRes));
                resolve();
                self.models.get("wallet").createSync(dbRes);
              }).catch(reject);
          });
        };
      },
      update(wallet) {
        return dispatch => {
          return self.models
              .get("wallet")
              .update(wallet, { _id: wallet._id })
              .then(() => dispatch(self.actions.updateSuccess(wallet)));
        };
      },
      delete(wallet) {
        return {
          type: self.constants.WALLET_DELETE_DATA,
          wallet
        };
      },
      fetch() {
        return self.models
          .get("wallet")
          .readAll()
          .then(wallets => {
            self.dispatch(self.actions.fetchDataSuccess(wallets));
          });
      }
    };
  }

  getReducers() {
    const self = this;
    return {
      wallets(state = {}, action) {
        switch (action.type) {
          case self.constants.WALLET_FETCH_DATA_SUCCESS:
            return _keyBy(action.wallets, "_id");
          case self.constants.WALLET_CREATE_DATA:
            return { ...state, [action.wallet._id]: action.wallet };
          case self.constants.WALLET_UPDATE_DATA:
            return { ...state, [action.wallet._id]: { ...state[action.wallet._id] ,...action.wallet } };
          case self.constants.WALLET_UPDATE_MID_DATA:
              const copyState = { ...state };
              delete copyState[action.wallet.mid];
              return { ...copyState, [action.wallet._id]: action.wallet };
          default:
            return state;
        }
      }
    };
  }
}

export default WalletRedux;
