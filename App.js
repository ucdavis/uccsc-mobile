import './Config';
import './Config/ReactotronConfig';

import DebugConfig from './Config/DebugConfig';
import { AppLoading, Font } from 'expo';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootContainer from './Containers/RootContainer';
import createStore from './Redux';

// Allow layoutanimations for android
// import { UIManager } from 'NativeModules'
// commented out because it currently causes errors :/
// UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
// create our store
const { store, persistor } = createStore();
const PersistLoader = !!persistor ? PersistGate : (props) => props.children;

/**
 * Provides an entry point into our application.
 * Expo will call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {

  state = {
    isReady: false,
    notification: null,
  };

  async _loadResources() {
    if (DebugConfig.useReactotron) {
      // Let's connect and clear Reactotron on every time we load the app
      console.tron.connect();
      console.tron.clear();
    }

    await Font.loadAsync({
      'Montserrat-Light': require('./Fonts/Montserrat-Light.ttf'),
      'Montserrat-SemiBold': require('./Fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Medium': require('./Fonts/Montserrat-Medium.ttf'),
    });

    return;
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadResources}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <PersistLoader loading={null} persistor={persistor}>
          <RootContainer />
        </PersistLoader>
      </Provider>
    );
  }
}

// Add cool reactotron overlay feature
const exportedApp = DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App;

export default exportedApp;
