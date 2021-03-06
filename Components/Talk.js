import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import Card from './Card';
import RoomInfo from './RoomInfo';
import TalkInfo from './TalkInfo';
import styles from './Styles/TalkStyle';

const tracks = require('../Fixtures/tracks.json');

export default class Talk extends React.PureComponent {
  renderAvatar() {
    const { avatarUrl } = this.props;
    if (!avatarUrl) {
      return null;
    }

    return (
      <Image style={styles.avatar} source={{ uri: avatarUrl }} />
    );
  }

  render() {
    const { name, title, start, duration, venue, onPress, track } = this.props;

    let containerStyles;

    const trackIndex = tracks.findIndex((t) => t.name === (track ? track.name : ''));
    if (trackIndex > -1) {
      containerStyles =
      {
        borderTopWidth: 15,
        borderTopColor: tracks[trackIndex].color,
      };
    }
    

    return (
      <Card style={containerStyles} onPress={onPress}>
        <View style={styles.info}>
          <View style={styles.infoText}>
            <Text style={styles.title} accessibilityLabel={`Session Title: ${title}.`}>{title}</Text>
            <Text style={styles.name} accessibilityLabel={`Session Speakers: ${name}.`}>{name}</Text>
          </View>
          { this.renderAvatar() }
        </View>
        { venue &&
          <View style={styles.roomInfo}>
            <RoomInfo building={venue.building} room={venue.room}  />
          </View>
        }
        <View style={styles.talkInfo}>
          <TalkInfo
            start={start}
            duration={duration}
            showToggleReminder
            toggleReminderData={{ title, start }}
          />
        </View>
      </Card>
    );
  }
}
