import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  dayToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.blue,
  },
  item: {
    flex: 1,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(253,229,255,0.5)',
  },
  activeItem: {
    borderBottomColor: Colors.snow,
  },
  text: {
    fontSize: 16,
    letterSpacing: 0,
    fontFamily: 'Montserrat-Light',
    backgroundColor: Colors.clear,
    color: 'rgba(255,255,255,0.80)',
  },
  activeText: {
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.snow,
  },
});
