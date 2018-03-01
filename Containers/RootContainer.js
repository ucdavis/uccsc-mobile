import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Notifications } from 'expo';
// import StartupActions from '../Redux/StartupRedux';
import NotificationActions from '../Redux/NotificationRedux';
import ScheduleActions from '../Redux/ScheduleRedux';
// import ReduxPersist from '../Config/ReduxPersist';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import styles from './Styles/RootContainerStyles';
import { registerForPushNotificationsAsync } from '../Services/PushNotifications';
import NotificationsBar from '../Components/NotificationsBar';

import { getSchedule } from '../Services/Api';

class RootContainer extends Component {
  async componentDidMount() {
    const { updateSchedule } = this.props;
    // if redux persist is not active fire startup action
    // if (!ReduxPersist.active) {
    //   this.props.startup()
    // }

    // fetch schedule updates
    const schedule = await getSchedule();
    updateSchedule(schedule);

    await registerForPushNotificationsAsync();

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

  render() {
    const { notifications, clearNotifications } = this.props;

    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <NotificationsBar
          notifications={notifications}
          clearNotifications={clearNotifications}
        />
        <ReduxNavigation />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications,
})

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  // startup: () => dispatch(StartupActions.startup()),
  addNotification: (notification) => dispatch(NotificationActions.addNotification(notification)),
  clearNotifications: () => dispatch(NotificationActions.clearNotifications()),
  updateSchedule: (schedule) => dispatch(ScheduleActions.updateSchedule(schedule)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
