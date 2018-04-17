import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles/ModalStyle';

const NotificationScreen = (props) => {
  const { notifications, onDismissModal } = props;

  const notificationItems = notifications.map((message) => (
    <Text style={styles.description} key={message}>
      { JSON.stringify(message) }
    </Text>
  ));

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
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
  );
};

export default NotificationScreen;
