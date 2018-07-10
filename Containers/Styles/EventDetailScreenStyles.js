import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: Colors.blue,
    paddingTop: Metrics.statusBarHeight,
    paddingHorizontal: Metrics.baseMargin,
  },
  container: {
    paddingTop: Metrics.doubleBaseMargin,
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
    backgroundColor: Colors.transparent,
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
    paddingBottom: 13,
    paddingTop: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    borderTopLeftRadius: Metrics.cardRadius,
    borderTopRightRadius: Metrics.cardRadius,
    backgroundColor: Colors.snow,
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
  section: {
    paddingVertical: 13,
    paddingHorizontal: Metrics.doubleBaseMargin,
    backgroundColor: Colors.snow,
    borderTopWidth: 1,
    borderTopColor: Colors.steel,
  },
  lastSection: {
    marginBottom: Metrics.baseMargin,
    borderBottomLeftRadius: Metrics.cardRadius,
    borderBottomRightRadius: Metrics.cardRadius,
  },
  descriptionView: {
  },
  descriptionText: {
    fontFamily: 'Montserrat-Light',
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 24,
    color: Colors.lightText,
    backgroundColor: Colors.transparent,
  },
  descriptionLink: {
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.blue,
  },
  speakers: {
    marginBottom: Metrics.baseMargin,
    borderRadius: Metrics.cardRadius,
  },
  speakerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingVertical: 13,
  },
  speakerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  avatarContainer: {

  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: Colors.snow,
    borderWidth: 1,
    zIndex: 4,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
  bioContainer: {
    flex: 1,
    paddingVertical: 13,
  },
  speakerBio: {
    fontFamily: 'Montserrat-Light',
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 24,
  },
});
