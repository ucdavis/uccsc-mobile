import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import AboutScreen from '../Components/AboutScreen'
import ScheduleScreen from '../Containers/ScheduleScreen'
import styles from './styles/NavigationStyles'

const TabNav = TabNavigator({
  Schedule: { screen: ScheduleScreen },
  About: { screen: AboutScreen }
}, {
  key: 'Schedule',
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  headerMode: 'none',
  initialRouteName: 'Schedule',
  tabBarOptions: {
    style: styles.tabBar,
    labelStyle: styles.tabBarLabel,
    activeTintColor: 'white',
    inactiveTintColor: 'white'
  }
})

export default TabNav
