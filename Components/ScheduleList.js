import React from 'react';
import {
  SectionList,
} from 'react-native';

import Activity from '../Components/Activity';
import Event from '../Components/Event';
import Meal from '../Components/Meal';
import Talk from '../Components/Talk';
import ScheduleSectionHeader from '../Components/ScheduleSectionHeader';

import styles from './Styles/ScheduleListStyles';

import { GetItemLayout } from '../Utils/SectionList';
import AppConfig from '../Config/AppConfig';

export default class ScheduleList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  shouldComponentUpdate(nextProps) {

    if (nextProps.schedule !== this.props.schedule) {
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

  createOnTalkPress = (item) => () => {
    const { screenProps, setSelectedEvent } = this.props;
    setSelectedEvent(item);
    
    const { rootNavigation } = screenProps;
    rootNavigation.navigate('TalkDetail');
  }

  getItemLayout = GetItemLayout({
    getItemHeight: (item) => {
      if (item.eventType === "Activity") {
        return 145;
      }
  
      if (item.eventType === "Meal/Snack") {
        return 145;
      }

      // use best guess for variable height rows
      return 205 + (1.002936 * item.title.length + 6.77378);
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
        onPress={this.createOnTalkPress(item)}
        venue={item.venue}
        track={item.track}
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
    const { schedule } = this.props;
    if (!schedule || !schedule.length) {
      return null;
    }

    return (
      <SectionList
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        sections={schedule}
        keyExtractor={(item, idx) => item.title}
        contentContainerStyle={styles.listContent}
        getItemLayout={this.getItemLayout}
        stickySectionHeadersEnabled
        ref={(r) => this.scheduleList = r}
      />
    );
  }
}
