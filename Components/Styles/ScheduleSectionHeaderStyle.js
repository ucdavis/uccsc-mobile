import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../Themes/';

export default StyleSheet.create({
  sectionHeaderContainer: {
    flex: 1,
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
    backgroundColor: Colors.blue,
    borderColor: 'rgba(253,229,255,0.5)',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    // shadowRadius: 20,
    // shadowColor: 'black',
    // shadowOpacity: 0.8,
    // elevation: 20,
  },
  headerTime: {
    textAlign: 'center',
    color: Colors.snow,
  },
});
