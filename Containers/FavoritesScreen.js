import React from 'react';
import {
  Text, View,
} from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import ScheduleActions from '../Redux/ScheduleRedux';

import ScheduleList from '../Components/ScheduleList';

import styles from './Styles/FavoritesScreenStyle';

import { GroupBy } from '../Utils/Array';
import { isBefore } from 'date-fns';

class FavoritesScreen extends React.Component {

  static navigationOptions = { 
    tabBarLabel: <View />,
    tabBarIcon: ({ focused }) => {
      var icon = focused ? 'star' : 'star-o';
      return (
        <FontAwesome
          name={icon}
          size={24}
          color="white"
        />
      );
    }
  }

  render() {
    const { schedule } = this.props;
    if (!schedule || !schedule.length) {
      return (
        <View style={styles.emptyContainer} accessible>
          <Text style={styles.emptyText}>
            Hey! You haven’t saved any sessions!
          </Text>
          <FontAwesome
            name="meh-o"
            size={48}
            color="white"
          />
          <Text style={styles.emptyText}>
            Go find some!
          </Text>
        </View>
      );
    }

    return (
      <ScheduleList
        routeName='Favorites'
        {...this.props}
      />
    );
  }
}

function buildScheduleList(talks) {

  // iterate out all items
  const events = [
    ...talks,
  ];

  // group events by time slot
  let timeslots = GroupBy(events, e => e.time);
  // map the events, and sort the timeslot by title
  // use property data for sectionlists
  timeslots = timeslots.map(g => {
    const data = g.values;
    data.sort((a, b) => {
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
}

const mapStoreToProps = (store) => {
  let talks = store.schedule.talks || [];
  talks = talks.filter(t => {
    return store.schedule.starredTalks.indexOf(t.title) > -1;
  });
  const schedule = buildScheduleList(talks);

  return {
    currentTime: new Date(store.schedule.currentTime),
    schedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedEvent: data => dispatch(ScheduleActions.setSelectedEvent(data)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(FavoritesScreen);
