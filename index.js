if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import MainApp from './MainApp';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => MainApp);
