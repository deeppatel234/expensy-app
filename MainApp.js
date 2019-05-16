import React from 'react';

import { Provider } from 'react-redux';
import store from 'Redux/store';

import App from './App';
import ReduxLoader from 'Base/ReduxLoader';

const MainApp = () => (
  <Provider store={store}>
    <ReduxLoader models={['setting', 'network']}>
      <App />
    </ReduxLoader>
  </Provider>
);

export default MainApp;

