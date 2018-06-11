import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Fonts, Metrics } from '../../Themes/';

const AnnouncementStyle: AnnouncementStyleType = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.transparent,
  },
  header: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontFamily: Fonts.type.base,
    color: Colors.snow,
    letterSpacing: 2,
    fontWeight: '600',
    marginTop: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.baseMargin,
    textAlign: 'center',
  },
  info: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    top: -20,
    left: (Metrics.screenWidth - 200) / 2,
    backgroundColor: Colors.snow,
  },
  buttonText: {
    fontSize: 11,
    fontFamily: Fonts.type.base,
    color: Colors.lightText,
    letterSpacing: 1,
    fontWeight: '600',
  },
  
  partyDescription: {
    fontSize: 13,
    fontFamily: Fonts.type.base,
    color: Colors.snow,
    letterSpacing: 2,
    fontWeight: '600',
    lineHeight: 24,
  },
};

export default AnnouncementStyle;
