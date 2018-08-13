import React, { Component } from 'react';
import { Linking, View, Modal, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { StackActions } from 'react-navigation';
import { Notifications } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import { closestIndexTo } from 'date-fns';

import * as NavigationService from '../Services/NavigationService';
import NotificationScreen from './NotificationScreen';
import ScheduleActions from '../Redux/ScheduleRedux';
import { dismissNotifications } from '../Services/PushNotifications';

import styles from './Styles/NotificationBarStyle';

const eventDeepLinkRegex = /^\/\/event\/(.*)$/gi;
const sessionDeepLinkRegex = /^\/\/session\/(.*)$/gi;

class NotificationsBar extends Component {

  state = {
    showModal: false,
    notification: null
  };

  componentDidMount() {
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    // show the banner
    this.setState({
      notification: notification.data,
    });

    // if the notification was selected
    if (notification.origin === 'selected') {
      // try to handle the notification's deeplink
      const handled = this._handleDeepLink(notification.data.link);
      if (handled) {
        this.onDismiss();
      }
    }
  }

  _handleDeepLink = (link) => {
    if (!link) {
      return false;
    }

    // check for http url
    if (link.startsWith('http')) {
      if (Linking.canOpenURL(link)) {
        Linking.openURL(link);
        return true;
      }
      return false;
    }

    // try to match event
    const eventMatch = eventDeepLinkRegex.exec(link);
    if (eventMatch && eventMatch.length > 1) {
      // find event
      let title = eventMatch[1];
      const activities = this.props.activities.filter(a=> a.title === title);
      if (!activities.length) {
        return false;
      }

      // pick the activity closest to now
      const dates = activities.map(a => a.time);
      const closest = closestIndexTo(new Date(), dates);
      activity = activities[closest];

      // setup navigation and go!
      this.props.setSelectedEvent(activity);
      NavigationService.navigate({ routeName: 'Schedule', action: StackActions.push({ routeName: 'EventDetail' }) });

      return true;
    }

    // try to match session
    const sessionMatch = sessionDeepLinkRegex.exec(link);
    if (sessionMatch && sessionMatch.length > 1) {
      // find talk
      const title = sessionMatch[1];
      const talk = this.props.talks.find(t => t.title === title);
      if (!talk) {
        return false;
      }

      // setup navigation and go!
      this.props.setSelectedEvent(talk);
      NavigationService.navigate({ routeName: 'Schedule', action: StackActions.push({ routeName: 'TalkDetail' }) });
      
      return true;
    }

    // no link matches found
    return false;
  }

  onPressStatusBarAlert = () => {
    const { notification } = this.state;

    if (notification && notification.link) {
      const handled = this._handleDeepLink(notification.link);
      if (handled) {
        this.onDismiss();
        return;
      } else {
        this.setState({
          notification: null,
        });
        return;
      }
    }

    this.onDismiss();
  }

  onDismiss = () => {
    this.setState({
      showModal: false,
      notification: null,
    });

    dismissNotifications();
  }

  renderBar(notification) {
    const message = notification.message || 'You have a notification!';

    const tap = notification.link ? <Text style={styles.statusBarTextMinor}>(tap for details)</Text> : null;

    return (
      <View style={styles.statusBar}>
        <TouchableOpacity style={styles.detailsButton} onPress={this.onPressStatusBarAlert}>
          <Text style={styles.statusBarText}>{ message }</Text>
          { tap }
        </TouchableOpacity>
        <TouchableOpacity style={styles.dismissButton} onPress={this.onDismiss}>
          <FontAwesome name="close" style={styles.dismissIcon} />
        </TouchableOpacity >
      </View>
    );
  }

  render() {
    const { notification } = this.state;

    if (!notification) {
      return null;
    }

    return (
      <View style={styles.container}>
        { this.renderBar(notification) }
        <Modal
          transparent
          animationType={'slide'}
          visible={this.state.showModal}
          onRequestClose={this.onDismiss}
        >
          <NotificationScreen
            onDismissModal={this.onDismiss}
            notification={notification}
          />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  activities: state.schedule.activities || [],
  talks: state.schedule.talks || [],
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedEvent: (talk) => dispatch(ScheduleActions.setSelectedEvent(talk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBar);
