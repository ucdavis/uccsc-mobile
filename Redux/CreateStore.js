import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import Config from '../Config/DebugConfig';
// import createSagaMiddleware from 'redux-saga'
import RehydrationServices from '../Services/RehydrationServices';
import ReduxPersistConfig from '../Config/ReduxPersistConfig';
// import ScreenTracking from './ScreenTrackingMiddleware'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Analytics Middleware ------------- */
  // middleware.push(ScreenTracking)

  /* ------------- Saga Middleware ------------- */

  // const sagaMonitor = Config.useReactotron ? console.tron.createSagaMonitor() : null
  // const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  // middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore;

  // if Persist is enabled, wrap the root reducer
  const persistedRootReducer = ReduxPersistConfig.active ? persistReducer(ReduxPersistConfig.storeConfig, rootReducer) : rootReducer;

  const store = createAppropriateStore(persistedRootReducer, compose(...enhancers));

  // configure persistStore and check reducer version number
  const persistor = ReduxPersistConfig.active ? persistStore(store) : null;

  // kick off root saga
  // sagaMiddleware.run(rootSaga)

  return { store, persistor };
}
