import React from 'react';
import {
  Image, View,
} from 'react-native';
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { isSameDay, isBefore } from 'date-fns';

import Config from '../Config/AppConfig';
import { Colors, Metrics } from '../Themes';
import { GroupBy } from '../Utils/Array';
import ScheduleActions from '../Redux/ScheduleRedux';

import Gradient from '../Components/Gradient';
import ScheduleList from '../Components/ScheduleList';
import FavoritesScreen from './FavoritesScreen';

import styles from './Styles/ScheduleScreenStyles';

buildScheduleList = (activities, talks, dayIndex) => {
  // fetch day
  const day = new Date(Config.conferenceDates[dayIndex]);

  // combine events
  let events = [
    ...activities,
    ...talks,
  ];

  // filter events
  events = events.filter(e => isSameDay(day, e.time));

  // group events by time slot
  let timeslots = GroupBy(events, e => e.time);

  // map the events, and sort the timeslot by title
  // use property data for sectionlists
  timeslots = timeslots.map(g => {
    const data = g.values;
    data.sort((a, b) => {
      // sort by type first
      if (a.eventType === 'Meal/Snack') {
        return -1;
      }
      if (b.eventType === 'Meal/Snack') {
        return 1;
      }

      if (a.eventType === 'Keynote') {
        return -1;
      }
      if (b.eventType === 'Keynote') {
        return 1;
      }

      if (a.eventType === 'Activity' && b.type === 'talk') {
        return -1;
      }
      if (b.eventType === 'Activity' && a.type === 'talk') {
        return 1;
      }

      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });

    return {
      time: g.key,
      data,
    };
  });

  // sort timeslots
  timeslots.sort((a, b) => {
    if (isBefore(new Date(a.time), new Date(b.time))) {
      return -1;
    }
    if (isBefore(new Date(b.time), new Date(a.time))) {
      return 1;
    }
    return 0;
  });

  return timeslots;
};

const mapStoreToPropsForList = (dayIndex) => (store) => {
  const activities = store.schedule.activities;
  const talks = store.schedule.talks;

  const events = buildScheduleList(activities, talks, dayIndex);

  return {
    currentTime: new Date(store.schedule.currentTime),
    isCurrentDay: isSameDay(store.schedule.currentTime, new Date(Config.conferenceDates[dayIndex])),
    events,
  };
};

const mapDispatchToPropsForList = (dispatch) => {
  return {
    setSelectedEvent: data => dispatch(ScheduleActions.setSelectedEvent(data)),
  };
};

const MondayScheduleList = connect(mapStoreToPropsForList(0), mapDispatchToPropsForList)(ScheduleList);
const TuesdayScheduleList = connect(mapStoreToPropsForList(1), mapDispatchToPropsForList)(ScheduleList);
const WednesdayScheduleList = connect(mapStoreToPropsForList(2), mapDispatchToPropsForList)(ScheduleList);

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
  Favorites: {
    screen: FavoritesScreen,
  }
};

const DayTabNavigatorOptions = {
  lazy: false,
  animationEnabled: false,
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: Colors.snow,
    inactiveTintColor: 'rgba(255,255,255,0.80)',
    showIcon: true,
    indicatorStyle: {
      backgroundColor: Colors.snow
    },
    labelStyle: {
      fontSize: 16,
      letterSpacing: 0,
      fontFamily: 'Montserrat-Light',
      backgroundColor: Colors.clear,
    },
    iconStyle: {
      marginBottom: 8,
    },
    tabStyle: {
      flex: 1,
      height: 70,
      alignItems: 'center',
      justifyContent: 'flex-end',
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
      <View style={headerStyle}>
        <Image source={require('../Images/gradient.png')} style={backgroundStyle} resizeMode="cover" />
      </View>
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
