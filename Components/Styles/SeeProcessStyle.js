import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  processContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 0,
    paddingHorizontal: Metrics.doubleBaseMargin,
    alignItems: 'center',
    height: 60,
    backgroundColor: Colors.wineGrape,
    borderBottomWidth: 1,
    borderBottomColor: Colors.snow,
  },
  codeIcon: {
    // marginLeft: 5,
    marginRight: 10,
  },
  text: {
    flex: 1,
    backgroundColor: Colors.transparent,
    color: Colors.snow,
    fontFamily: Fonts.type.bold,
    fontSize: 13,
    letterSpacing: 0.2,
  },
  rightArrow: {
    marginLeft: 10,
  },
});
