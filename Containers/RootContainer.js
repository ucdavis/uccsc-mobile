import React from 'react';
import { AppState, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { isFuture, addMinutes } from 'date-fns';

import AnnouncementActions from '../Redux/AnnouncementsRedux';
import ScheduleActions from '../Redux/ScheduleRedux';

import createAppNavigator from '../Navigation/AppNavigation';
import NotificationsBar from '../Components/NotificationsBar';
import styles from './Styles/RootContainerStyles';

import { getActivities, getTalks, getNews } from '../Services/Api';
import PushNotifications from '../Services/PushNotifications';
import * as NavigationService from '../Services/NavigationService';
import { accessibilityFocusRef } from '../Helpers/AccessibilityHelpers';

// get ref so we can focus it on first load
// do the create out here so we don't recreate the nav on state change
let _tabBarRef;
const AppNavigation = createAppNavigator({
  tabBarOptions: {
    ref: (r) => _tabBarRef = r,
  },
});

class RootContainer extends React.Component {

  state = {
    appState: AppState.currentState
  }

  async componentDidMount() {
    // focus bottom tab on first load
    accessibilityFocusRef(_tabBarRef);

    // setup permissions and presets
    await this.setupNotifications();

    // listen for app foreground loading
    AppState.addEventListener('change', this._handleAppStateChange);

    // try to fetch api data
    this.tryUpdateData();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.tryUpdateData();
    }

    this.setState({appState: nextAppState});
  }

  // track last time we updated the api data
  // default to the year 2000!~
  lastUpdateData = new Date(2000);

  tryUpdateData = async () => {
    // don't call the function more than once per 5 minutes
    if (isFuture(addMinutes(this.lastUpdateData, 5))) {
      return;
    }
    // update our tracking date
    this.lastUpdateData = new Date();

    const activitiesTask = getActivities();
    const talksTask = getTalks();
    const newsTask = getNews();

    // process requests
    try {
      const { updateSchedule, updateNews } = this.props;

      const activities = await activitiesTask;
      const talks = await talksTask;
      updateSchedule(activities, talks);

      const news = await newsTask;
      updateNews(news);
    } catch (err) {
      console.error(err);
    }
  }

  setupNotifications = async () => {
    // prompt user for permissions, get device id, etc
    await PushNotifications.registerForPushNotificationsAsync();

    // setup channels
    PushNotifications.setupNotificationChannels()

    // clear out old notifications
    await PushNotifications.cancelAllNotifications();

    // schedule notifications for starred talks
    const talks = this.props.talks.filter(talk => this.props.starredTalks.indexOf(talk.title) > 1);
    talks.forEach(talk => PushNotifications.scheduleTalkReminder(talk));

    // schedule preset notifications
    PushNotifications.schedulePresetNotifications();
  }

  render() {
    return (
      <View style={styles.applicationView} ref={r => this._rootRef = r}>
        <StatusBar barStyle="light-content" />
        <NotificationsBar />
        <AppNavigation ref={r => NavigationService.setTopLevelNavigator(r)} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  talks: state.schedule.talks,
  starredTalks: state.schedule.starredTalks,
});

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  updateSchedule: (activities, talks) => dispatch(ScheduleActions.updateSchedule(activities, talks)),
  updateNews: (news) => dispatch(AnnouncementActions.updateNews(news)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
