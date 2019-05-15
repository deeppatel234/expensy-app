import Reactotron from 'reactotron-react-native';
import { REACTOTRON_URL } from 'react-native-dotenv';
import { reactotronRedux } from 'reactotron-redux';


const reactotron = Reactotron
  .configure({ host: REACTOTRON_URL }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .connect() // let's connect!

console.tron = Reactotron;

export default reactotron;
