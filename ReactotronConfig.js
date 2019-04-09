import Reactotron from 'reactotron-react-native';

const reactotron = Reactotron
  .configure({ host: '192.168.0.102' }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

console.tron = Reactotron;

export default reactotron;
