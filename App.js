import './Config';
import './Config/ReactotronConfig';

import DebugConfig from './Config/DebugConfig';
import { AppLoading, Asset, Font, SplashScreen } from 'expo';
import React, { Component } from 'react';
import { Animated, Image } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootContainer from './Containers/RootContainer';
import createStore from './Redux';
import { Images } from './Themes';

// Allow layoutanimations for android
// import { UIManager } from 'NativeModules'
// commented out because it currently causes errors :/
// UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
// create our store
const { store, persistor } = createStore();
const PersistLoader = !!persistor ? PersistGate : (props) => props.children;

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

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
    splashAnimation: new Animated.Value(0),
    splashAnimationComplete: false,
    notification: null,
  };

  componentDidMount() {
    SplashScreen.preventAutoHide();
  }

  async _loadResources() {
    if (DebugConfig.useReactotron) {
      // Let's connect and clear Reactotron on every time we load the app
      console.tron.connect();
      console.tron.clear();
    }

    const imageAssets = cacheImages([
      Images.meetup1,
      Images.meetup2,
      Images.welcomeDinner,
      Images.morningJog,
      Images.morningYoga,
      Images.busTour,
      require('./Images/splash.png'),
    ]);

    const fontAssets = cacheFonts([
      {'Montserrat-Light': require('./Fonts/Montserrat-Light.ttf')},
      {'Montserrat-SemiBold': require('./Fonts/Montserrat-SemiBold.ttf')},
      {'Montserrat-Medium': require('./Fonts/Montserrat-Medium.ttf')},
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  _maybeRenderLoadingImage = () => {
    if (this.state.splashAnimationComplete) {
      return null;
    }

    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          opacity: this.state.splashAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        }}>
        <Animated.Image
          source={require('./Images/splash.png')}
          style={{
            width: undefined,
            height: undefined,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            resizeMode: 'contain',
            transform: [
              {
                scale: this.state.splashAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 4],
                }),
              },
            ],
          }}
          onLoadEnd={this._animateOut}
        />
      </Animated.View>
    );
  };

  _animateOut = () => {
    SplashScreen.hide();
    Animated.timing(this.state.splashAnimation, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ splashAnimationComplete: true });
    });
};

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
          {this._maybeRenderLoadingImage()}
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
