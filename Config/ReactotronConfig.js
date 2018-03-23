import Config from '../Config/DebugConfig';
import Immutable from 'seamless-immutable';
import Reactotron, { networking } from 'reactotron-react-native';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';

// https://github.com/infinitered/reactotron for more options!

Reactotron
  .configure({ name: 'uccsc-mobile-2018', host: 'localhost' })
  .useReactNative()
  .use(networking())
  .use(reduxPlugin({ onRestore: Immutable }));

console.tron = Reactotron;

