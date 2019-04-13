import Request from '../base/Request';
import Models from '../sql/models';

class BaseRedux {
  constructor() {
    this.constants = this.getConstants();
    this.reducers = this.getReducers();
    this.actions = this.getActions();
    this.request = Request;
    this.models = Models;
  }

  setDispatch(dispatch) {
    this.dispatch = dispatch;
  }

  getActions() {
    throw new Error('Unimplemented Method: getActions');
  }

  getConstants() {
    throw new Error('Unimplemented Method: getConstants');
  }

  getReducers() {
    throw new Error('Unimplemented Method: getReducers');
  }
}

export default BaseRedux;