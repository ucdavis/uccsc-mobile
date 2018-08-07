import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { MaterialIcons } from '@expo/vector-icons';

import AppConfig from '../Config/AppConfig';

import AboutScreen from '../Components/AboutScreen';
import EventDetailScreen from '../Containers/EventDetailScreen';
import TalkDetailScreen from '../Containers/TalkDetailScreen';
import LocationScreen from '../Containers/LocationScreen';
import ScheduleScreen from '../Containers/ScheduleScreen';
import styles from './styles/NavigationStyles';

const ScheduleStackOptions = {
  headerMode: 'none',
  initialRouteName: 'Home',
  cardStyle: styles.card,
};

if (AppConfig.disableAnimations) {
  ScheduleStackOptions.transitionConfig = () => ({
    transitionSpec: {
      duration: 0
    }
  });
}

const ScheduleStack = createStackNavigator({
  Home: { screen: ScheduleScreen },
  EventDetail: {
    screen: EventDetailScreen,
    navigationOptions: {
      title: 'EventDetail',
      tabBarLabel: 'Schedule',
      tabBarIcon: ({ focused }) => (
        <MaterialIcons name="schedule" size={24} color="white" />
      ),
    },
  },
  TalkDetail: {
    screen: TalkDetailScreen,
    navigationOptions: {
      title: 'TalkDetail',
      tabBarLabel: 'Schedule',
      tabBarAccessibilityLabel: 'Talk Detail.',
      tabBarIcon: ({ focused }) => (
        <MaterialIcons name="schedule" size={24} color="white" />
      ),
    },
  },
}, ScheduleStackOptions);

const createAppNavigator = (options = {}) => createBottomTabNavigator({
  Schedule: { screen: ScheduleStack, navigationOptions: ScheduleScreen.navigationOptions },
  Location: {
    screen: LocationScreen,
    navigationOptions: {
      tabBarLabel: 'Location',
      tabBarAccessibilityLabel: 'Location Tab. Button.',
      tabBarIcon: ({ focused }) => (
        <MaterialIcons name="location-on" size={24} color="white" />
      ),
    },
  },
  About: {
    screen: AboutScreen,
    navigationOptions: {
      tabBarLabel: 'Info',
      tabBarAccessibilityLabel: 'Conference Information Tab. Button.',
      tabBarIcon: ({ focused }) => (
        <MaterialIcons name="info" size={24} color="white" />
      ),
    },
  },
}, {
  ...options,
  animationEnabled: true,
  swipeEnabled: false,
  initialRouteName: 'Schedule',
  tabBarOptions: {
    ...options.tabBarOptions,
    style: styles.tabBar,
    labelStyle: styles.tabBarLabel,
    activeTintColor: 'white',
    inactiveTintColor: 'white',
  },
});

export default createAppNavigator;
