import { combineReducers } from 'redux';

import Registry from '../base/Registry';
import UserRedux from './UserRedux';
import CategoriesRedux from './CategoriesRedux';
import NetworkRedux from './NetworkRedux';


class ReduxRegistry extends Registry {
  get(key, action) {
    const r = super.get(key);
    if (action) {
      return r.actions[action];
    }
    return r;
  }

  getCombineReducers() {
    const reducersList = Object.values(this.data).map(d => d.getReducers());
    const reducers = {};
    reducersList.forEach(reducer => Object.assign(reducers, reducer));
    return combineReducers(reducers);
  }

  setDispatch(dispatch) {
    Object.values(this.data).forEach(d => d.setDispatch(dispatch));
  }
}

const reduxRegistry = new ReduxRegistry();

reduxRegistry.set('user', new UserRedux());
reduxRegistry.set('categories', new CategoriesRedux());
reduxRegistry.set('network', new NetworkRedux());

export default reduxRegistry;