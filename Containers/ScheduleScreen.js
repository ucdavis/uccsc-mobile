import React from 'react';
import {
  ImageBackground,
  Image,
  Text,
  View,
  FlatList,
  SectionList,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Config from '../Config/AppConfig';
import { Images } from '../Themes';
import NotificationActions from '../Redux/NotificationRedux';
import ScheduleActions from '../Redux/ScheduleRedux';
import PushNotifications from '../Services/PushNotifications';

import Logo from '../Images/Logo';
import Gradient from '../Components/Gradient';
import DayToggle from '../Components/DayToggle';
import Talk from '../Components/Talk';
import ScheduleSectionHeader from '../Components/ScheduleSectionHeader';

import styles from './Styles/ScheduleScreenStyles';

import { GroupBy, FindIndexAll, Sum } from '../Utils/Array';
import { GetItemLayout } from '../Utils/SectionList';
import { startOfDay, isSameDay, isWithinRange } from 'date-fns';

const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = 160;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

class ScheduleScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Schedule',
    tabBarIcon: ({ focused }) => (
      <MaterialIcons name="schedule" size={24} color="white" />
    )
  }

  constructor(props) {
    super(props);

    const { currentTime, starredTalks } = props;
    const activeDay = 0;
    const isCurrentDay = this.isActiveCurrentDay(currentTime, activeDay);
    const schedule = this.setStarProperty(props.schedule, starredTalks);
    const eventsByDay = this.buildScheduleList(schedule);

    this.state = {
      activeDay,
      isCurrentDay,
      eventsByDay,
      scrollY: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.schedule !== nextProps.schedule
      || this.props.starredTalks !== nextProps.starredTalks) {
      // rebuild list
      const schedule = this.setStarProperty(nextProps.schedule, nextProps.starredTalks);
      const eventsByDay = this.buildScheduleList(schedule);
      this.setState({ eventsByDay });
    }
  }

  isActiveCurrentDay = (currentTime, activeDay) =>
    isSameDay(currentTime, new Date(Config.conferenceDates[activeDay]))

  setStarProperty = (schedule, starredTalks) => {
    if (!starredTalks || !starredTalks.length) {
      return schedule;
    }

    return schedule.map(s => {
      const starred = starredTalks.indexOf(s.title) > -1;
      return { ...s, starred };
    });
  }

  buildScheduleList = (schedule) => {
    // presort events
    const sorted = [...schedule].sort((a, b) => a.time < b.time);

    // group events by day
    const byDay = GroupBy(sorted, (t => startOfDay(t.time)));

    // for each day, group by timeslot
    return byDay.map(d => {
      // group by timeslot
      return GroupBy(d.values, (t => t.time))
        .map(t => { 
          // remap prop names
          return {
            time: t.key,
            data: t.values
          };
        });
    });
  }

  onEventPress = (item) => {
    const { navigation, setSelectedEvent } = this.props;

    setSelectedEvent(item);
    navigation.navigate('TalkDetail');
  }

  setActiveDay = (activeDay) => {
    const { currentTime } = this.props;
    const { eventsByDay } = this.state;
    const isCurrentDay = this.isActiveCurrentDay(currentTime, activeDay)

    this.setState({ activeDay, isCurrentDay }, () => {
      if (!this.scheduleList) {
        return;
      }

      if (isCurrentDay) {
        // Scroll to active
        // const headersIndices = FindIndexAll(schedule, i => i.isHeader);
        // const index = this.getActiveIndex(data)
        // this.scheduleList.scrollToIndex({index, animated: false})
      } else {
        // Scroll to top
        this.scheduleList.getNode().scrollToLocation({ sectionIndex: 0, itemIndex: 0, viewPosition: 1, animated: true });
        // this.scheduleList.getNode().scrollTo({y: 0, animated: false})
      }
    });
  }

  getItemLayout = GetItemLayout({
    getItemHeight: (item) => {
      if (item.type === 'talk') {
        // use best guess for variable height rows
        return 138 + (1.002936 * item.title.length + 6.77378)
      }

      return 154;
    },
    getSectionHeaderHeight: () => 60,
  });

  async toggleReminder(item) {
    const { starred, title } = item;
    const { starTalk, unstarTalk, trackLocalNotification, untrackLocalNotification, localNotifications } = this.props;

    // create schedule local notification, track it, update star status
    if (!starred) {
      const id = await PushNotifications.scheduleTalkReminder(item);
      trackLocalNotification(id, title);
      starTalk(title);
      return;
    }

    // find local notification, cancel it, update star status
    console.log(title, localNotifications);
    const notification = localNotifications.find(n => n.title === title);
    if (notification) {
      await PushNotifications.cancelTalkReminder(notification.id);
      untrackLocalNotification(notification.id);
    }

    unstarTalk(title);
  }

  renderHeader = () => {
    // move container up with scroll
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolateLeft: 'extend',
      extrapolateRight: 'clamp',
    });

    const headerStyle = [
      styles.headerContainer,
      {
        height: HEADER_MAX_HEIGHT,
        transform: [{ translateY: headerTranslate }] 
      }];

    // scale image
    const imageScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1.2, 0.8, 0.8],
      extrapolateLeft: 'extend',
      extrapolateRight: 'clamp'
    });

    // slowly move it down to counter the container's upward movement
    const backgroundTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, HEADER_SCROLL_DISTANCE / 1.5],
      extrapolateLeft: 'extend',
      extrapolateRight: 'clamp',
    });

    const backgroundStyle = [
      styles.headerBackground,
      {
        height: HEADER_MAX_HEIGHT,
        transform: [
          // { scale: imageScale },
          { translateY: backgroundTranslate }
        ],
      },
    ];

    // move down to counter container's upward movement
    const logoContainterTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, HEADER_SCROLL_DISTANCE / 2],
      extrapolateLeft: 'extend',
      extrapolateRight: 'clamp',
    });

    const logoContainerStyle = [
      styles.headerLogoContainer,
      {
        height: HEADER_MAX_HEIGHT,
        transform: [
          { translateY: logoContainterTranslate },
        ],
      },
    ];

    // scale logo
    const logoScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE - 30, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.6],
      extrapolate: 'clamp',
    });

    const logoStyle = [
      styles.headerLogo,
      { transform: [{ scale: logoScale }] },
    ];

    return (
      <Animated.View style={headerStyle}>
        <Animated.Image source={require('../Images/gradient.png')} style={backgroundStyle} resizeMode="cover" />
        <Animated.View style={logoContainerStyle}>
          <Logo style={logoStyle} />
        </Animated.View>
        { this.renderDayToggle() }
      </Animated.View>
    );
  }

  renderDayToggle = () => {
    const opacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });

    const dayToggleStyle = [
      styles.dayToggle,
      {
        opacity,
      },
    ];

    return (
      <Animated.View style={dayToggleStyle}>
        <DayToggle
          activeDay={this.state.activeDay}
          onPressIn={this.setActiveDay}
        />
      </Animated.View>
    )
  }

  renderSectionHeader = ({ section }) => {
    return (
      <ScheduleSectionHeader time={section.time} />
    )
  }

  renderItem = ({ item }) => {
    const toggleReminder = this.toggleReminder.bind(this, item);
    return (
      <Talk
        type={item.type}
        name={item.speaker}
        avatarURL={`https://infinite.red/images/chainreact/${item.image}.png`}
        title={item.title}
        start={item.time}
        duration={item.duration}
        onPress={() => this.onEventPress(item)}
        starred={item.starred}
        toggleReminder={toggleReminder}
      />
    );
  }

  renderList(data) {
    if (!data || !data.length) {
      return null;
    }

    const listContentStyle = [
      styles.listContent,
      {
        marginTop: HEADER_MIN_HEIGHT,
        paddingTop: HEADER_SCROLL_DISTANCE,
      },
    ];

    return (
      <AnimatedSectionList
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        sections={data}
        keyExtractor={(item, idx) => idx}
        contentContainerStyle={listContentStyle}
        getItemLayout={this.getItemLayout}
        stickySectionHeadersEnabled={true}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          { useNativeDriver: true }
        )}
        ref={(r) => this.scheduleList = r}
      />
    );
  }

  render() {
    const { activeDay, eventsByDay } = this.state;
    const data = eventsByDay[activeDay];

    return (
      <Gradient style={styles.container}>
        { this.renderHeader() }
        { this.renderList(data) }
      </Gradient>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    // currentTime: new Date(store.schedule.currentTime),
    schedule: store.schedule.speakerSchedule,
    starredTalks: store.schedule.starredTalks,
    localNotifications: store.notifications.localNotifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getScheduleUpdates: () => dispatch(ScheduleActions.getScheduleUpdates()),
    setSelectedEvent: data => dispatch(ScheduleActions.setSelectedEvent(data)),
    starTalk: title => dispatch(ScheduleActions.starTalk(title)),
    unstarTalk: title => dispatch(ScheduleActions.unstarTalk(title)),
    trackLocalNotification: (id, title) =>
      dispatch(NotificationActions.trackLocalNotification(id, title)),
    untrackLocalNotification: (id) => dispatch(NotificationActions.untrackLocalNotification(id)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ScheduleScreen);
