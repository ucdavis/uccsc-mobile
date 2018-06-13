import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import AboutScreen from '../Components/AboutScreen';
import EventDetailScreen from '../Containers/EventDetailScreen';
import LocationScreen from '../Containers/LocationScreen';
import ScheduleScreen from '../Containers/ScheduleScreen';
import styles from './styles/NavigationStyles';

const ScheduleStack = createStackNavigator({
  Home: { screen: ScheduleScreen },
  EventDetail: { screen: EventDetailScreen },
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
  cardStyle: styles.card,
});

const TabNav = createBottomTabNavigator({
  Schedule: { screen: ScheduleStack },
  Location: { screen: LocationScreen },
  About: { screen: AboutScreen },
}, {
  key: 'Schedule',
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  headerMode: 'none',
  initialRouteName: 'Schedule',
  tabBarOptions: {
    style: styles.tabBar,
    labelStyle: styles.tabBarLabel,
    activeTintColor: 'white',
    inactiveTintColor: 'white',
  },
});

export default TabNav;
