import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  main: {

  },
  container: {
    margin: Metrics.baseMargin,
    paddingTop: Metrics.doubleBaseMargin,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.doubleBaseMargin,
  },
  backButtonIcon: {
    marginRight: 5,
    color: 'rgba(255,255,255,0.80)',
  },
  backButtonText: {
    fontFamily: 'Montserrat-Light',
    fontSize: 17,
    letterSpacing: 0,
    backgroundColor: Colors.transparent,
    color: 'rgba(255,255,255,0.80)',
  },
  cardShadow1: {
    flex: 1,
    height: 5,
    marginHorizontal: 10,
    backgroundColor: Colors.purpleShadow1,
    borderTopLeftRadius: Metrics.cardRadius,
    borderTopRightRadius: Metrics.cardRadius,
  },
  cardShadow2: {
    flex: 1,
    height: 6,
    marginHorizontal: 5,
    backgroundColor: Colors.purpleShadow2,
    borderTopLeftRadius: Metrics.cardRadius,
    borderTopRightRadius: Metrics.cardRadius,
  },
  card: {
    paddingTop: 48,
    paddingHorizontal: Metrics.doubleBaseMargin,
    borderTopLeftRadius: Metrics.cardRadius,
    borderTopRightRadius: Metrics.cardRadius,
    backgroundColor: Colors.snow,
  },
  talkInfo: {
    paddingHorizontal: 0,
  },
  roomInfo: {
    paddingHorizontal: 0,
  },
  sectionHeading: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    fontFamily: 'Montserrat-Light',
    fontSize: 11,
    letterSpacing: 3,
    color: Colors.lightText,
  },
  heading: {
    marginBottom: 5,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    letterSpacing: 0,
    color: Colors.darkPurple,
  },
  description: {
    marginBottom: 30,
    fontFamily: 'Montserrat-Light',
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 24,
    color: Colors.lightText,
  },
  social: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  speakersContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.2)',
    backgroundColor: Colors.snow,
    paddingVertical: 13,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  speakerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
  },
  avatarContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: Colors.snow,
    borderWidth: 1,
    zIndex: 4,
  },
  speakerInfo: {
    flex: 1,
    paddingHorizontal: Metrics.baseMargin,
  },
  speakerName: {
    fontFamily: 'Montserrat-Light',
    fontSize: 17,
    letterSpacing: 0,
  },
  speakerCompany: {
    fontFamily: 'Montserrat-Light',
    fontSize: 11,
    color: Colors.lightText,
    marginBottom: Metrics.baseMargin,
  },
  speakerBio: {
    fontFamily: 'Montserrat-Light',
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 24,
  },
});
