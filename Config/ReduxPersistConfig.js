import { AsyncStorage } from 'react-native';

export default {
  active: true,
  reducerVersion: '1.0.0',
  storeConfig: {
    key: 'root',
    storage: AsyncStorage,
    // reducer keys that you do NOT want stored to persistence here
    blacklist: ['location'],
    // whitelist: [], Optionally, just specify the keys you DO want stored to
    // persistence. An empty array means 'don't store any reducers' -> infinitered/ignite#409
    // transforms: [],
  },
};
