import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import AboutScreen from '../Components/AboutScreen';
import ActivityDetailScreen from '../Containers/ActivityDetailScreen';
import LocationScreen from '../Containers/LocationScreen';
import ScheduleScreen from '../Containers/ScheduleScreen';
import TalkDetailScreen from '../Containers/TalkDetailScreen';
import styles from './styles/NavigationStyles';

const ScheduleStack = new StackNavigator({
  Home: { screen: ScheduleScreen },
  ActivityDetail: { screen: ActivityDetailScreen },
  TalkDetail: { screen: TalkDetailScreen },
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
  cardStyle: styles.card,
});

const TabNav = new TabNavigator({
  Schedule: { screen: ScheduleStack },
  Location: { screen: LocationScreen },
  About: { screen: AboutScreen },
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
    inactiveTintColor: 'white',
  },
});

export default TabNav;
