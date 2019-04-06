import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
// if(__DEV__) {
// }

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
