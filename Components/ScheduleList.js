import React from 'react';
import {
  SectionList,
} from 'react-native';
import { connect } from 'react-redux';
import Config from '../Config/AppConfig';
import ScheduleActions from '../Redux/ScheduleRedux';

import Activity from '../Components/Activity';
import Event from '../Components/Event';
import Meal from '../Components/Meal';
import Talk from '../Components/Talk';
import ScheduleSectionHeader from '../Components/ScheduleSectionHeader';

import styles from './Styles/ScheduleListStyles';

import { GroupBy } from '../Utils/Array';
import { GetItemLayout } from '../Utils/SectionList';
import { isSameDay, isBefore } from 'date-fns';
import AppConfig from '../Config/AppConfig';

class ScheduleList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      events: buildScheduleList(props.activities, props.talks, props.dayIndex),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      events: buildScheduleList(nextProps.activities, nextProps.talks, nextProps.dayIndex),
    });
  }

  shouldComponentUpdate(nextProps) {

    if (nextProps.dayIndex !== this.props.dayIndex) {
      return true;
    }

    if (nextProps.activities !== this.props.activities) {
      return true;
    }

    if (nextProps.talks !== this.props.talks) {
      return true;
    }

    return false;
  }

  createOnEventPress = (item) => () => {
    const { screenProps, setSelectedEvent } = this.props;
    setSelectedEvent(item);
    
    const { rootNavigation } = screenProps;
    rootNavigation.navigate('EventDetail');
  }

  getItemLayout = GetItemLayout({
    getItemHeight: (item) => {
      if (item.type === 'talk') {
        // use best guess for variable height rows
        return 205 + (1.002936 * item.title.length + 6.77378);
      }
      return 145;
    },
    getSectionHeaderHeight: () => 39,
  });

  renderSectionHeader = ({ section }) => { 
    return ( 
      <ScheduleSectionHeader time={section.time} /> 
    ); 
  } 

  renderItem = ({ item }) => {
    if (item.type === 'talk') {
      return this.renderTalk(item);
    }

    if (item.eventType === "Activity") {
      return this.renderActivity(item);
    }

    if (item.eventType === "Meal/Snack") {
      return this.renderMeal(item);
    }

    return this.renderEvent(item);
  }

  renderTalk = (item) => {
    let avatarUrl = '';
    if (!!item.speakers && item.speakers.length) {
      // find first speaker with a photo
      const photoUrl = item.speakers.reduce((prev, s) => s.photo ? s.photo.url : prev, '');
      avatarUrl = AppConfig.conferenceUrl + photoUrl;
    }

    return (
      <Talk
        type={item.type}
        name={item.speaker}
        avatarUrl={avatarUrl}
        title={item.title}
        start={item.time}
        duration={item.duration}
        onPress={this.createOnEventPress(item)}
        venue={item.venue}
      />
    );
  }

  renderActivity = (item) => {
    return (
      <Activity
        type={item.eventType}
        title={item.title}
        sponsor={item.sponsor}
        start={item.time}
        end={item.end}
        duration={item.duration}
        name={item.speaker}
        onPress={this.createOnEventPress(item)}
        venue={item.venue}
        image={item.image}
      />
    );
  }

  renderMeal = (item) => {
    return (
      <Meal
        type={item.eventType}
        title={item.title}
        sponsors={item.sponsors}
        start={item.time}
        end={item.end}
        duration={item.duration}
        name={item.speaker}
        onPress={this.createOnEventPress(item)}
        venue={item.venue}
        image={item.image}
      />
    );
  }

  renderEvent = (item) => {
    return (
      <Event
        type={item.eventType}
        title={item.title}
        sponsor={item.sponsor}
        start={item.time}
        end={item.end}
        duration={item.duration}
        name={item.speaker}
        onPress={this.createOnEventPress(item)}
        venue={item.venue}
        image={item.image}
      />
    );
  }

  render () {
    const { events } = this.state;
    if (!events || !events.length) {
      return null;
    }

    return (
      <SectionList
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        sections={events}
        keyExtractor={(item, idx) => item.title}
        contentContainerStyle={styles.listContent}
        getItemLayout={this.getItemLayout}
        stickySectionHeadersEnabled
        ref={(r) => this.scheduleList = r}
      />
    );
  }
}

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

const mapStoreToProps = (dayIndex) => (store) => {
  return {
    currentTime: new Date(store.schedule.currentTime),
    isCurrentDay: isSameDay(store.schedule.currentTime, new Date(Config.conferenceDates[dayIndex])),
    activities: store.schedule.activities,
    talks: store.schedule.talks,
    dayIndex: dayIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedEvent: data => dispatch(ScheduleActions.setSelectedEvent(data)),
  };
};

export const MondayScheduleList = connect(mapStoreToProps(0), mapDispatchToProps)(ScheduleList);
export const TuesdayScheduleList = connect(mapStoreToProps(1), mapDispatchToProps)(ScheduleList);
export const WednesdayScheduleList = connect(mapStoreToProps(2), mapDispatchToProps)(ScheduleList);
