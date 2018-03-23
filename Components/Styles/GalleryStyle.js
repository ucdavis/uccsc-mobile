import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(253,229,255,0.5)',
    paddingBottom: 5,
    paddingTop: 20,
  },
  tabText: {
    fontFamily: Fonts.type.base,
    fontSize: 15,
    lineHeight: 23,
    letterSpacing: 0.47,
    color: 'rgba(253,229,255,0.5)',
    backgroundColor: Colors.transparent,
  },
  activeTab: {
    borderBottomColor: Colors.snow,
  },
  activeTabText: {
    color: Colors.snow,
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 35,
  },
  item: {
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.snow,
    width: Metrics.screenWidth / 2 - 10,
  },
  itemImage: {
    height: Metrics.screenWidth / 2 - 10 - 2,
    width: Metrics.screenWidth / 2 - 10 - 2,
  },
  itemDetail: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Colors.snow,
  },
  itemTitle: {
    fontFamily: Fonts.type.semiBold,
    fontSize: 15,
    letterSpacing: 0,
    minHeight: 40,
    color: Colors.darkPurple,
  },
  itemActionContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  itemAction: {
    fontFamily: Fonts.type.medium,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    color: Colors.darkPurple,
  },
});
