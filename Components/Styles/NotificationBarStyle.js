import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { ApplicationStyles, Colors, Fonts } from '../../Themes/';
import { Metrics } from '../../Themes/';

const Styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: Constants.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
    zIndex: 100,
  },
  statusBar: {
    height: 75,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 20,
    margin: Metrics.baseMargin,
    zIndex: 100,
  },
  detailsButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
    backgroundColor: Colors.transparent,
  },
  statusBarText: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: Colors.transparent,
    color: Colors.text,
    fontFamily: Fonts.type.base,
    fontSize: 15,
  },
  statusBarTextMinor: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: Colors.transparent,
    color: Colors.text,
    fontFamily: Fonts.type.base,
    fontSize: 13,
  },
  dismissButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin,
    backgroundColor: Colors.transparent,
  },
  dismissIcon: {
    textAlign: 'center',
    backgroundColor: Colors.transparent,
    color: Colors.text,
  },
});

export default Styles;
