import React from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Notifications } from 'expo';
import AnnouncementActions from '../Redux/AnnouncementsRedux';
import StartupActions from '../Redux/StartupRedux';
import NavigationActions from '../Redux/NavigationRedux';
import NotificationActions from '../Redux/NotificationRedux';
import ScheduleActions from '../Redux/ScheduleRedux';
import ReduxPersistConfig from '../Config/ReduxPersistConfig';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import styles from './Styles/RootContainerStyles';
import { registerForPushNotificationsAsync } from '../Services/PushNotifications';
import NotificationsBar from '../Components/NotificationsBar';

import { getActivities, getTalks, getNews } from '../Services/Api';

const sessionDeepLinkRegex = /^\/\/session\/(.*)$/gi;

class RootContainer extends React.Component {
  async componentDidMount() {
    const { updateActivities, updateTalks, updateNews } = this.props;
    // if redux persist is not active fire startup action
    if (!ReduxPersistConfig.active) {
      this.props.startup();
    }

    // start schedule update requests
    const activitiesTask = getActivities();
    const talksTask = getTalks();
    const newsTask = getNews();

    await registerForPushNotificationsAsync();

    // process requests
    try {
      const activities = await activitiesTask;
      updateActivities(activities);
      const talks = await talksTask;
      updateTalks(talks);
      const news = await newsTask;
      updateNews(news);
    } catch (err) {
      console.error(err);
    }

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    const { addNotification } = this.props;
    addNotification(notification);
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
      this.props.navigateToTalkDetail({ routeName: 'Schedule', action: 'TalkDetail' });
      
      return true;
    }
    return false;
  }

  render() {
    const { notifications, clearNotifications } = this.props;

    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="light-content" />
        <NotificationsBar
          notifications={notifications}
          clearNotifications={clearNotifications}
          handleDeepLink={this._handleDeepLink}
        />
        <ReduxNavigation />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  talks: state.schedule.speakerSchedule,
  notifications: state.notifications.notifications,
});

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  addNotification: (notification) => dispatch(NotificationActions.addNotification(notification)),
  clearNotifications: () => dispatch(NotificationActions.clearNotifications()),
  updateActivities: (activities) => dispatch(ScheduleActions.updateActivities(activities)),
  updateNews: (news) => dispatch(AnnouncementActions.updateNews(news)),
  updateTalks: (talks) => dispatch(ScheduleActions.updateTalks(talks)),
  setSelectedEvent: (talk) => dispatch(ScheduleActions.setSelectedEvent(talk)),
  navigateToTalkDetail: () =>
    dispatch(NavigationActions.navigate({
      routeName: 'Schedule',
      action: NavigationActions.navigate({ routeName: 'TalkDetail' }),
    })),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
