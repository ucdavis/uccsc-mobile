import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import AboutScreen from '../Components/AboutScreen'
import ScheduleScreen from '../Containers/ScheduleScreen'
import TalkDetailScreen from '../Containers/TalkDetailScreen'
import styles from './styles/NavigationStyles'

const ScheduleStack = StackNavigator({
  Home: { screen: ScheduleScreen },
  TalkDetail: { screen: TalkDetailScreen }
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
  cardStyle: styles.card
});

const TabNav = TabNavigator({
  Schedule: { screen: ScheduleStack },
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
