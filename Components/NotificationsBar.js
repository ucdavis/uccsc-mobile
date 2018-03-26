import React, { Component } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import styles from './Styles/NotificationBarStyle';
import NotificationScreen from './NotificationScreen';

class NotificationsBar extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  onPressStatusBarAlert = () => {
    this.setState({ showModal: true });
  }

  onDismissModal = () => {
    this.setState({ showModal: false });
    this.props.clearNotifications();
  }

  renderBar() {
    if (this.state.showModal) {
      return null;
    }

    return (
      <TouchableOpacity
        style={styles.statusBar}
        onPress={this.onPressStatusBarAlert}
      >
        <Text style={styles.statusBarText}>Talk coming up! (tap for details)</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { notifications } = this.props;

    if (notifications.length === 0) {
      return null;
    }

    return (
      <View>
        { this.renderBar() }
        <Modal
          transparent
          animationType={'slide'}
          visible={this.state.showModal}
          onRequestClose={this.onDismissModal}>
          <NotificationScreen
            onDismissModal={this.onDismissModal}
            notifications={notifications}
          />
        </Modal>
      </View>
    );
  }
}

export default NotificationsBar;
