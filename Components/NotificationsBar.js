import React, { Component } from 'react'
import { View, Modal, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/NotificationBarStyle'

const NotificationScreen = ({notifications, onDismissModal}) => {
  const notificationItems = notifications.map((message) => (
    <Text style={styles.description} key={message}>
      {message} 
    </Text>
  ))

  return (
    <View style={styles.container}>
      <View style={styles.colorBump}>
        <View style={styles.section}>
          <Text style={styles.heading}>Sessions Starting!</Text>
          {notificationItems}
        </View>
        <TouchableOpacity onPress={onDismissModal} style={styles.button}>
          <Text style={styles.text}>
            Close Message
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

class NotificationsBar extends Component {

  constructor (props) {
    super(props)
    this.state = { showModal: true }
  }

  onPressStatusBarAlert = () => {
    this.setState({ showModal: true })
  }

  onDismissModal = () => {
    this.setState({ showModal: false })
    this.props.clearNotifications()
  }

  render () {
    const {notifications} = this.props

    if (notifications.length === 0) {
      return null
    }

    return (
      <View>
        <View
            style={styles.statusBar}
            onPress={this.onPressStatusBarAlert}
        >
            <Text style={styles.statusBarText}>Talk coming up! (tap for details)</Text>
        </View>
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
    )
  }
}

export default NotificationsBar