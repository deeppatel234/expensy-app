import React from 'react';

import { Provider } from 'react-redux';
import store from './redux/store';

import HomePage from './HomePage';

const Main = () => (
  <Provider store={store}>
    <HomePage />
  </Provider>
);

export default Main;
