import React, { Component } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './Styles/NotificationBarStyle';
import NotificationScreen from './NotificationScreen';

class NotificationsBar extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  onPressStatusBarAlert = (notification) => {
    const data = notification.data;
    if (data && data.link) {
      const handled = this.handleDeepLink(data.link);
      if (handled) {
        this.props.clearNotifications();
        return;
      }
    }

    this.setState({ showModal: true });
  }

  onDismiss = () => {
    this.setState({ showModal: false });
    this.props.clearNotifications();
  }

  handleDeepLink = (link) => {
    if (this.props.handleDeepLink) {
      return this.props.handleDeepLink(link);
    }
    return false;
  }

  renderBar(notification) {
    if (this.state.showModal) {
      return null;
    }

    const message = notification.message || 'You have a notification!';
    const onPress = this.onPressStatusBarAlert.bind(this, notification);

    return (
      <View style={styles.statusBar}>
        <TouchableOpacity style={styles.detailsButton} onPress={onPress}>
          <Text style={styles.statusBarText}>{ message }</Text>
          <Text style={styles.statusBarTextMinor}>(tap for details)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dismissButton} onPress={this.onDismiss}>
          <FontAwesome name="close" style={styles.dismissIcon} />
        </TouchableOpacity >
      </View>
    );
  }

  render() {
    const { notifications } = this.props;

    if (notifications.length === 0) {
      return null;
    }

    const notification = notifications[notifications.length - 1];

    return (
      <View style={styles.container}>
        { this.renderBar(notification) }
        <Modal
          transparent
          animationType={'slide'}
          visible={this.state.showModal}
          onRequestClose={this.onDismiss}>
          <NotificationScreen
            onDismissModal={this.onDismiss}
            notifications={notifications}
          />
        </Modal>
      </View>
    );
  }
}

export default NotificationsBar;
