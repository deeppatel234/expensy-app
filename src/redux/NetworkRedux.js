import NetInfo from "@react-native-community/netinfo";

import BaseRedux from './BaseRedux';

class NetworkRedux extends BaseRedux {
  constructor(props) {
    super(props);

    NetInfo.addEventListener('connectionChange', this.onChangeNetwork.bind(this));
  }

  onChangeNetwork(data) {
    this.dispatch(this.actions.changeNetworkStatus(data));
  }

  getConstants() {
    return {
      CHANGE_NETWORK_STATUS: 'CHANGE_NETWORK_STATUS',
    };
  }

  getActions() {
    const self = this;
    return {
      changeNetworkStatus(status) {
        return {
          type: self.constants.CHANGE_NETWORK_STATUS,
          status,
        };
      },
      fetch() {
        return (dispatch) => {
          return NetInfo.getConnectionInfo().then(data => {
            dispatch(self.actions.changeNetworkStatus(data));
          });
        };
      },
    };
  }

  getReducers() {
    const self = this;
    return {
      network(state = {}, action) {
        switch (action.type) {
          case self.constants.CHANGE_NETWORK_STATUS:
            return { ...action.status }
          default:
            return state;
        }
      },
    };
  }
}

export default NetworkRedux;