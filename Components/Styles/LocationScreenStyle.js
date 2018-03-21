import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'black',
  },
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  mainHeading: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 31,
    letterSpacing: 0.2,
    color: Colors.snow,
  },
  address: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    letterSpacing: 0.47,
    lineHeight: 23,
    textAlign: 'center',
    color: '#FDE5FF',
  },
  map: {
    height: 200,
    width: '100%',
  },
  mapActions: {
    paddingHorizontal: 12,
    backgroundColor: Colors.snow,
    borderTopWidth: 1,
    borderTopColor: '#C4C4C4',
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    shadowColor: Colors.black,
    shadowRadius: 3,
    shadowOffset: {
      x: 10,
      y: 10,
    },
    shadowOpacity: 0.3,
    zIndex: 1,
  },
  getDirections: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
  },
  venueName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    letterSpacing: 0,
    color: Colors.darkPurple,
  },
  venueAddress: {
    fontFamily: 'Montserrat-Light',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    color: Colors.lightText,
  },
  addressContainer: {
    flex: 4,
  },
  directionsIcon: {
    alignItems: 'center',
    flex: 1,
  },
  directionsLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
    letterSpacing: 0,
    color: Colors.darkPurple,
  },
});
