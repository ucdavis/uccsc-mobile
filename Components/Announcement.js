import React from 'react';
import { Image, View, Text, } from 'react-native';
import styles from './Styles/AnnouncementStyle';

class Announcement extends React.Component {

  render() {
    const { style, announcement } = this.props;
    if (!announcement) return null;

    const {
      title,
      type,
      articleType,
      body,
      category,
    } = announcement;

    if (!title) return null;

    return (
      <View>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {title}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Announcement;
