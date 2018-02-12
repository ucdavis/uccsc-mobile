import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  headerGradient: {
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 20,
    backgroundColor: Colors.background
  },
  dayToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 80,
    backgroundColor: Colors.blue,
  },
  inactiveDay: {
    backgroundColor: Colors.clear,
    fontFamily: 'Montserrat-Light',
    fontSize: 16,
    color: 'rgba(255,255,255,0.80)',
    letterSpacing: 0
  },
  activeDay: {
    backgroundColor: Colors.clear,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: Colors.snow,
    letterSpacing: 0
  }
})