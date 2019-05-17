import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { DOMAIN } from './appConfig';

const reactotron = Reactotron
  .configure({ host: DOMAIN }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .connect() // let's connect!

console.tron = Reactotron;

export default reactotron;
