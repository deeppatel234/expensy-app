import _keyBy from 'lodash/keyBy';
import BaseRedux from './BaseRedux';


class WalletRedux extends BaseRedux {
  syncComplete(wallets) {
    this.dispatch(this.actions.fetchDataSuccess(wallets));
  }

  getConstants() {
    return {
      WALLET_LOADING_ERROR: 'WALLET_LOADING_ERROR',
      WALLET_FETCH_DATA_SUCCESS: 'WALLET_FETCH_DATA_SUCCESS',
      WALLET_CREATE_DATA: 'WALLET_CREATE_DATA',
      WALLET_UPDATE_DATA: 'WALLET_UPDATE_DATA',
      WALLET_DELETE_DATA: 'WALLET_DELETE_DATA',
    };
  }

  getActions() {
    const self = this;
    return {
      loadingError() {
        return {
          type: self.constants.WALLET_LOADING_ERROR,
        };
      },
      fetchDataSuccess(wallets) {
        return {
          type: self.constants.WALLET_FETCH_DATA_SUCCESS,
          wallets,
        };
      },
      createSuccess(wallet) {
        return {
          type: self.constants.WALLET_CREATE_DATA,
          wallet,
        };
      },
      create(wallet) {
        return (dispatch) => {
          return self.models.get('wallet').create(wallet, true)
            .then((dbRes) => dispatch(self.actions.createSuccess(dbRes)));
        };
      },
      update(wallet) {
        return {
          type: self.constants.WALLET_UPDATE_DATA,
          wallet,
        };
      },
      delete(wallet) {
        return {
          type: self.constants.WALLET_DELETE_DATA,
          wallet,
        };
      },
      fetch() {
        return (dispatch) => {
          return self.models.get('wallet').readAll().then((wallets) => {
            dispatch(self.actions.fetchDataSuccess(wallets));
          });
        };
      },
    };
  }

  getReducers() {
    const self = this;
    return {
      walletsLoadingStatus(state = 'IN_PROGRESS', action) {
        switch (action.type) {
          case self.constants.WALLET_LOADING_ERROR:
            return 'ERROR';
          case self.constants.WALLET_FETCH_DATA_SUCCESS:
            return 'SUCCESS';
          default:
            return state;
        }
      },
      wallets(state = {}, action) {
        switch (action.type) {
          case self.constants.WALLET_FETCH_DATA_SUCCESS:
            return _keyBy(action.wallets, '_id');
          case self.constants.WALLET_CREATE_DATA:
            return { ...state, [action.wallet._id] : action.wallet };
          case self.constants.WALLET_UPDATE_DATA:
            // TODO: handle this;
            return state;
          default:
            return state;
        }
      },
    };
  }
}

export default WalletRedux;
