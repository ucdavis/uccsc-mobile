import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.snow,
  },
  detail: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // flexWrap: 'wrap',
    paddingRight: Metrics.doubleBaseMargin,
  },
  detailLabel: {
    fontFamily: 'Montserrat-Light',
    fontSize: 11,
    color: Colors.lightText,
    letterSpacing: 0,
  },
  detailText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    color: Colors.darkPurple,
    letterSpacing: 0,
    // flexWrap: 'wrap'
  },
});
