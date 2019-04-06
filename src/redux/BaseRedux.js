import Request from '../base/Request';

class BaseRedux {
  constructor() {
    this.constants = this.getConstants();
    this.reducers = this.getReducers();
    this.actions = this.getActions();
    this.request = Request;
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