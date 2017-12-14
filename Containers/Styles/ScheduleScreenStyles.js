import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    
  },
  listContent: {
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin * 8,
  },
  headerContainer: {
    flex: 1,
    paddingTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    backgroundColor: Colors.snow,    
  },
  headerTime: {
    textAlign: 'center'
  },
})
