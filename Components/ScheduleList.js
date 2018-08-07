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

import AppConfig from '../Config/AppConfig';
import { accessibilityFocusRef } from '../Helpers/AccessibilityHelpers';
import { withTimer } from '../Helpers/WithTimer';
import { addActionListener } from '../Services/NavigationService';

class ScheduleList extends React.Component {

  componentDidMount() {
    this.navigationFocusListener = addActionListener((payload) => this.onNavigationChanged(payload));

    if (this.props.navigation.isFocused()) {
      this.accessibilityFocusTop();
    }
  }
  
  shouldComponentUpdate(nextProps) {
    if (nextProps.schedule !== this.props.schedule) {
      return true;
    }
    
    return false;
  }

  componentWillUnmount() {
    if (this.navigationFocusListener) {
      this.navigationFocusListener.remove();
    }
  }

  onNavigationChanged = (payload) => {
    if (payload.routeName === this.props.routeName) {
      this.accessibilityFocusTop();
    }
  }

  accessibilityFocusTop = () => {
    this.props.timer.setTimeout(() => accessibilityFocusRef(this._scheduleList), 100);
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
        stickySectionHeadersEnabled
        ref={(r) => this._scheduleList = r}
      />
    );
  }
}

export default withTimer(ScheduleList);
