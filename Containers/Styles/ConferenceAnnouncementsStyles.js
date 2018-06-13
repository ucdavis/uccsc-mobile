import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: Metrics.doubleBaseMargin,
    backgroundColor: Colors.transparent,
    borderBottomWidth: 1,
    borderBottomColor: Colors.snow,
  }
});