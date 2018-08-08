import React from 'react';
import { View, Text, } from 'react-native';
import styles from './Styles/AnnouncementStyle';

class Announcement extends React.PureComponent {

  render() {
    const { announcement } = this.props;
    if (!announcement) return null;

    const {
      title,
      body,
    } = announcement;

    if (!title) return null;

    return (
      <View
        style={styles.container}
        accessible
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {title}
          </Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.body}>
            {body}
          </Text>
        </View>
      </View>
    );
  }
}

export default Announcement;
