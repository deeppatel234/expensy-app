import { createStore, applyMiddleware, compose } from "redux";
import Reactotron from "../../ReactotronConfig";

import thunk from "redux-thunk";

import ReduxRegistry from "./ReduxRegistry";

const combineReducers = ReduxRegistry.getCombineReducers();

const enhancers = compose(
  applyMiddleware(thunk),
  Reactotron.createEnhancer()
);

const store = createStore(combineReducers, enhancers);

ReduxRegistry.setDispatch(store.dispatch);
ReduxRegistry.setGetState(store.getState);

export default store;
