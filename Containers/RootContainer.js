import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { Notifications } from 'expo'
// import StartupActions from '../Redux/StartupRedux'
import NotificationActions from '../Redux/NotificationRedux'
// import ReduxPersist from '../Config/ReduxPersist'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import styles from './Styles/RootContainerStyles'
import { registerForPushNotificationsAsync } from '../Services/PushNotifications';

class RootContainer extends Component {
  async componentDidMount () {
    // if redux persist is not active fire startup action
    // if (!ReduxPersist.active) {
    //   this.props.startup()
    // }

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

  render () {
    return (
      <View style={styles.applicationView}>
        <View style={styles.statusBarPadder} />
        <StatusBar barStyle='light-content' />
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
  clearNotifications: () => dispatch(NotificationActions.clearNotifications())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
