import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Fonts, Metrics } from '../../Themes/';

const AnnouncementStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
    marginVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  header: {
    marginBottom: Metrics.baseMargin,
  },
  headerText: {
    fontSize: 20,
    fontFamily: Fonts.type.base,
    color: Colors.snow,
    letterSpacing: 2,
    fontWeight: '600',
    textAlign: 'center',
  },
  bodyContainer: {
  },
  body: {
    fontSize: 13,
    fontFamily: Fonts.type.base,
    color: Colors.snow,
    letterSpacing: 2,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default AnnouncementStyle;
