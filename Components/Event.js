import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import Card from './Card';
import RoomInfo from './RoomInfo';
import TalkInfo from './TalkInfo';
import styles from './Styles/EventStyle';
import AppConfig from '../Config/AppConfig';
import { Colors } from '../Themes/';

export default class Event extends React.PureComponent {
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
    const { name, title, start, duration, venue, starred, toggleReminder } = this.props;

    return (
      <Card>
        <View style={styles.container}>
          <View style={styles.info}>
            <View style={styles.infoText}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.name}>{name}</Text>
            </View>
            { this.renderAvatar() }
          </View>
          { venue &&
            <View style={styles.roomInfo}>
              <RoomInfo building={venue.building} room={venue.room}  />
            </View>
          }
          <View style={styles.talkInfo}>
            <TalkInfo start={start} duration={duration} starred={starred} toggleReminder={toggleReminder} />
          </View>
        </View>
      </Card>
    );
  }
}
