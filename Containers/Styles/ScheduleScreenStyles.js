import { StyleSheet, Platform } from 'react-native';
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/';

export default StyleSheet.create({
  // ...ApplicationStyles.screen,
  container: {
    flex: 1,
    zIndex: 0,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.transparent,
    paddingTop: Metrics.statusBarHeight,
    zIndex: 11,
  },
  headerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: 100,
    zIndex: 10,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    width: '100%',
    zIndex: 10,
  },
});
