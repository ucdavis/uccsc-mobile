import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  tabBar: {
    height: 65,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 28,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.5)',
    backgroundColor: Colors.background,
    shadowRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 20,
  },
  tabBarLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    letterSpacing: 0,
    color: Colors.text
  },
  card: {
    opacity: 1,
    backgroundColor: Colors.background
  }
})
