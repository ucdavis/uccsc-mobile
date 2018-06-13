import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    // shadowRadius: 5,
    // shadowColor: 'black',
    // shadowOpacity: 0.8,
  },
  currentDay: {
    marginLeft: 16,
    marginRight: 24
  },
  active: {
    marginLeft: 6,
    marginRight: 34,
    borderRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 5,
    shadowColor: Colors.redShadow,
    shadowOpacity: 1
  },
  finished: {
    opacity: 0.7
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Metrics.doubleBaseMargin,
    backgroundColor: Colors.snow
  },
  infoText: {
    flex: 1,
    paddingRight: Metrics.doubleBaseMargin
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: Colors.darkPurple,
    letterSpacing: 0
  },
  name: {
    fontFamily: 'Montserrat-Light',
    fontSize: 13,
    color: Colors.lightText,
    letterSpacing: 0,
    lineHeight: 18
  },
  avatar: {
    width: Metrics.images.avatar,
    height: Metrics.images.avatar,
    borderColor: Colors.avatarBorder,
    borderWidth: 1,
    borderRadius: Metrics.images.avatar / 2
  },
  moreInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: Metrics.doubleBaseMargin,
    backgroundColor: Colors.silver
  },
  details: {
    flexDirection: 'row'
  },
  detail: {
    paddingRight: Metrics.doubleBaseMargin
  },
  detailLabel: {
    fontFamily: 'Montserrat-Light',
    fontSize: 11,
    color: Colors.lightText,
    letterSpacing: 0
  },
  detailText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    color: Colors.darkPurple,
    letterSpacing: 0
  },
  roomInfo: {
    paddingVertical: 13,
    paddingHorizontal: Metrics.doubleBaseMargin,
    backgroundColor: Colors.snow,
  },
  talkInfo: {
    paddingVertical: 13,
    paddingHorizontal: Metrics.doubleBaseMargin,
    backgroundColor: Colors.snow,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
});
