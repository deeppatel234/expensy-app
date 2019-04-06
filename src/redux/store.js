
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import ReduxRegistry from './ReduxRegistry';

const combineReducers = ReduxRegistry.getCombineReducers();

const store = createStore(combineReducers, applyMiddleware(thunk));

export default store;
