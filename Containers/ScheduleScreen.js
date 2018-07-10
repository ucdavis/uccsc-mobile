import React from 'react';
import {
  Animated,
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Metrics } from '../Themes';

import Gradient from '../Components/Gradient';
import { MondayScheduleList, TuesdayScheduleList, WednesdayScheduleList } from '../Components/ScheduleList';

import styles from './Styles/ScheduleScreenStyles';

const DayTabs = {
  Monday: {
    screen: MondayScheduleList,
    navigationOptions: { tabBarLabel: 'Mon' },
  },
  Tuesday: {
    screen: TuesdayScheduleList,
    navigationOptions: { tabBarLabel: 'Tue' },
  },
  Wednesday: {
    screen: WednesdayScheduleList,
    navigationOptions: { tabBarLabel: 'Wed' },
  },
};

const DayTabNavigatorOptions = {
  lazy: false,
  animationEnabled: false,
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: Colors.snow,
    inactiveTintColor: 'rgba(255,255,255,0.80)',
    indicatorStyle: {
      backgroundColor: Colors.snow
    },
    labelStyle: {
      fontSize: 16,
      letterSpacing: 0,
      fontFamily: 'Montserrat-Light',
      backgroundColor: Colors.clear,
    },
    tabStyle: {
      flex: 1,
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(253,229,255,0.5)',
    },
    style: {
      backgroundColor: Colors.blue,
    }
  }
};

export default class ScheduleScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Home',
    tabBarLabel: 'Schedule',
    tabBarIcon: ({ focused }) => (
      <MaterialIcons
        name="schedule"
        size={24}
        color="white"
      />
    ),
  }

  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  renderHeader = () => {
    const headerStyle = [
      styles.headerContainer,
      {
        height: Metrics.statusBarHeight,
      }];

    const backgroundStyle = [
      styles.headerBackground,
      {
        height: Metrics.statusBarHeight,
      },
    ];

    return (
      <Animated.View style={headerStyle}>
        <Animated.Image source={require('../Images/gradient.png')} style={backgroundStyle} resizeMode="cover" />
      </Animated.View>
    );
  }

  render() {
    const DayTabNavigator = createMaterialTopTabNavigator(DayTabs, {
      ...DayTabNavigatorOptions,
      initialRouteName: 'Monday',
    });

    const containerStyle = [
      styles.container,
      {
        paddingTop: Metrics.statusBarHeight,
      }
    ];

    return (
      <Gradient style={containerStyle}>
        { this.renderHeader() }
        <DayTabNavigator screenProps={{ rootNavigation: this.props.navigation }} />
      </Gradient>
    );
  }
}
