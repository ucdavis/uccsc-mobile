import './Config'
import './Config/ReactotronConfig'

// import PushConfig from '../Config/PushConfig'
import DebugConfig from './Config/DebugConfig'
import { Font } from 'expo';
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './Containers/RootContainer'
import createStore from './Redux'
// import codePush from 'react-native-code-push'

// Allow layoutanimations for android
// import { UIManager } from 'NativeModules'
// commented out because it currently causes errors :/
// UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
// create our store
const store = createStore()

// Configure push notifications, passing store's dispatch
// PushConfig.configure(store.dispatch)

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {

  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Montserrat-Light': require('./Fonts/Montserrat-Light.ttf'),
      'Montserrat-SemiBold': require('./Fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Medium': require('./Fonts/Montserrat-Medium.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render () {
    if (!this.state.fontLoaded) return null;

    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

// Add cool reactotron overlay feature
const exportedApp = DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App

// Add codepush
// export default codePush(exportedApp)

export default exportedApp