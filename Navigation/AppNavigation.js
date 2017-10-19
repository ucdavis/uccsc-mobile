import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import AboutScreen from '../Containers/AboutScreen'
import styles from './Styles/NavigationStyles'

const TabNav = TabNavigator({
  About: { screen: AboutScreen }
}, {
  key: 'About',
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  headerMode: 'none',
  initialRouteName: 'About',
  tabBarOptions: {
    style: styles.tabBar,
    labelStyle: styles.tabBarLabel,
    activeTintColor: 'white',
    inactiveTintColor: 'white'
  }
})

export default TabNav
