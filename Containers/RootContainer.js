import React from 'react';
import { AppState, View, StatusBar } from 'react-native';
import { Notifications } from 'expo';
import { connect } from 'react-redux';
import { StackActions } from 'react-navigation';
import { isFuture, addMinutes } from 'date-fns';

import AnnouncementActions from '../Redux/AnnouncementsRedux';
import NotificationActions from '../Redux/NotificationRedux';
import ScheduleActions from '../Redux/ScheduleRedux';
import StartupActions from '../Redux/StartupRedux';

import createAppNavigator from '../Navigation/AppNavigation';
import NotificationsBar from '../Components/NotificationsBar';
import ReduxPersistConfig from '../Config/ReduxPersistConfig';
import styles from './Styles/RootContainerStyles';

import { getActivities, getTalks, getNews } from '../Services/Api';
import { registerForPushNotificationsAsync } from '../Services/PushNotifications';
import * as NavigationService from '../Services/NavigationService';
import { accessibilityFocusRef } from '../Helpers/AccessibilityHelpers';

const sessionDeepLinkRegex = /^\/\/session\/(.*)$/gi;

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
    // if redux persist is not active fire startup action
    if (!ReduxPersistConfig.active) {
      this.props.startup();
    }

    // focus bottom tab on first load
    accessibilityFocusRef(_tabBarRef);

    // prompt user for permissions, get device id, etc
    await registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);

    // listen for app foreground loading
    AppState.addEventListener('change', this._handleAppStateChange);

    // try to fetch api data
    this.tryUpdateData();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleNotification = (notification) => {
    // show the banner regardless
    const { addNotification, clearNotifications } = this.props;
    addNotification(notification);

    // if the notification was selected
    if (notification.origin === 'selected') {
      // try to handle the notification's deeplink
      const handled = this._handleDeepLink(notification.data.link);
      if (handled) {
        clearNotifications();
      }
    }
  };

  _handleDeepLink = (link) => {
    const sessionMatch = sessionDeepLinkRegex.exec(link);
    if (sessionMatch && sessionMatch.length > 1) {
      // find talk
      const title = sessionMatch[1];
      const talk = this.props.talks.find(t => t.title === title);
      if (!talk) {
        return false;
      }

      // setup navigation and go
      this.props.setSelectedEvent(talk);
      NavigationService.navigate({ routeName: 'Schedule', action: StackActions.push({ routeName: 'TalkDetail' }) });
      
      return true;
    }
    return false;
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

  render() {
    const { notifications, clearNotifications } = this.props;

    return (
      <View style={styles.applicationView} ref={r => this._rootRef = r}>
        <StatusBar barStyle="light-content" />
        <NotificationsBar
          notifications={notifications}
          clearNotifications={clearNotifications}
          handleDeepLink={this._handleDeepLink}
        />
        <AppNavigation ref={r => NavigationService.setTopLevelNavigator(r)} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  talks: state.schedule.talks,
  notifications: state.notifications.notifications,
});

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  addNotification: (notification) => dispatch(NotificationActions.addNotification(notification)),
  clearNotifications: () => dispatch(NotificationActions.clearNotifications()),
  updateSchedule: (activities, talks) => dispatch(ScheduleActions.updateSchedule(activities, talks)),
  updateNews: (news) => dispatch(AnnouncementActions.updateNews(news)),
  setSelectedEvent: (talk) => dispatch(ScheduleActions.setSelectedEvent(talk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
