import NetInfo from "@react-native-community/netinfo";

import BaseRedux from './BaseRedux';

class NetworkRedux extends BaseRedux {
  constructor(props) {
    super(props);

    NetInfo.addEventListener('connectionChange', this.onChangeNetwork.bind(this));
    NetInfo.isConnected.addEventListener('connectionChange', this.onChangeConnected.bind(this));
  }

  onChangeNetwork(data) {
    this.dispatch(this.actions.changeNetworkStatus(data));
  }

  onChangeConnected(isConnected) {
    this.dispatch(this.actions.changeNetworkConnect(isConnected));
  }

  getConstants() {
    return {
      CHANGE_NETWORK_STATUS: 'CHANGE_NETWORK_STATUS',
      CHANGE_NETWORK_CONNECT: 'CHANGE_NETWORK_CONNECT',
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
      changeNetworkConnect(isConnected) {
        return {
          type: self.constants.CHANGE_NETWORK_CONNECT,
          isConnected,
        };
      },
      fetch() {
        return NetInfo.getConnectionInfo().then(data => {
          self.dispatch(self.actions.changeNetworkStatus(data));
        });
      },
    };
  }

  getReducers() {
    const self = this;
    return {
      network(state = {}, action) {
        switch (action.type) {
          case self.constants.CHANGE_NETWORK_STATUS:
            return { ...state, ...action.status };
          case self.constants.CHANGE_NETWORK_CONNECT:
            return { ...state, isConnected: action.isConnected };
          default:
            return state;
        }
      },
    };
  }
}

export default NetworkRedux;