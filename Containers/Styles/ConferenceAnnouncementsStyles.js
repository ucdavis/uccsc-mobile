import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingBottom: Metrics.baseMargin,
    backgroundColor: Colors.transparent,
    borderBottomWidth: 1,
    borderBottomColor: Colors.snow,
  },
  carousel: {
    flex: 1,
  },
  slide: {
  },
  pagination: {
    paddingVertical: 0,
  },
  dotContainer: {
    paddingVertical: Metrics.doubleBaseMargin,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)'
  }
});