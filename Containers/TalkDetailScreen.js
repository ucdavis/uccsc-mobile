import React from 'react';
import { connect } from 'react-redux';
import { StackActions } from 'react-navigation';
import {
  BackHandler,
  ScrollView,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MarkdownView } from 'react-native-markdown-view';
import { MaterialIcons } from '@expo/vector-icons';

const tracks = require('../Fixtures/tracks.json');

import AppConfig from '../Config/AppConfig';

import Gradient from '../Components/Gradient';
import RoomInfo from '../Components/RoomInfo';
import TalkInfo from '../Components/TalkInfo';

import styles from './Styles/TalkDetailScreenStyles';

class TalkDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'TalkDetail',
    tabBarLabel: 'Schedule',
    tabBarIcon: ({ focused }) => (
      <MaterialIcons name="schedule" size={24} color="white" />
    ),
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.goBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.goBack);
  }

  goBack = () => {
    this.props.navigation.dispatch(StackActions.popToTop());
    return true;
  };

  onLinkPress = (url) => {
    if (!url.startsWith('http')) {
      url = `${AppConfig.conferenceUrl}${url}`;
    }

    if (Linking.canOpenURL(url)) {
      Linking.openURL(url);
    }
  }

  renderDetail(label, detail) {
    if (!detail) {
      return null;
    }

    return (
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>{ label }</Text>
        <Text style={styles.detailText}>{ detail }</Text>
      </View>
    );
  }

  renderAvatar(speaker) {
    if (!speaker.photo) {
      return null;
    }

    return (
      <Image
        style={styles.avatar}
        source={{ uri: `${AppConfig.conferenceUrl}/${speaker.photo.url}` }}
      />
    );
  }

  renderSpeakers() {
    const { speakers } = this.props;
    if (!speakers || !speakers.length) {
      return null;
    }

    return (
      <View style={[styles.section, styles.speakers]}>
        <Text style={styles.sectionHeading}>ABOUT</Text>
        { speakers.map(s => {
          const id = '00000000000000000000000000000000';
          return (
            <View key={s.name} style={styles.speakerContainer}>
              <View style={styles.speakerInfo}>
                <View style={styles.avatarContainer}>
                  { this.renderAvatar(s) }
                </View>
                <View style={styles.nameContainer}>
                  <Text style={styles.speakerName}>{s.name}</Text>
                  <Text style={styles.speakerCompany}>{s.company}</Text>
                </View>
              </View>
              <View style={styles.bioContainer}>
                <Text style={styles.speakerBio}>{s.bio}</Text>
              </View>
            </View>
          );
        }) }
      </View>
    );
  }

  render() {
    const { title, start, duration, time, description, venue, track, level, knowledge, software } = this.props;
    
    const descriptionStyles = {
      link: StyleSheet.flatten(styles.descriptionLink),
      paragraph: StyleSheet.flatten(styles.descriptionText),
    };

    // shadows
    let cardShadow1Style = styles.cardShadow1;
    const trackIndex = tracks.findIndex((t) => t.name === (track ? track.name : ''));
    if (trackIndex > -1) {
      cardShadow1Style = [cardShadow1Style, { backgroundColor: tracks[trackIndex].color }];
    }

    return (
      <Gradient style={styles.gradient}>
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={this.goBack}>
              <MaterialIcons name="chevron-left" size={24} style={styles.backButtonIcon} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={cardShadow1Style} />
            <View style={styles.card}>
              <View style={styles.sectionHeadingContainer}>
                <Text style={styles.sectionHeading}>TALK</Text>
                <Text style={styles.sectionTrackHeading}>{track.name}</Text>
              </View>
              <Text style={styles.heading}>{ title }</Text>
            </View>
            <View style={styles.section}>
              <TalkInfo
                showDay
                start={time}
                duration={duration}
                showToggleReminder
                toggleReminderData={{ title, start }}
              />
            </View>
            { venue && 
              <View style={styles.section}>
                  <RoomInfo building={venue.building} room={venue.room} />
              </View>
            }
            <View style={[styles.section, styles.lastSection]}>
              <MarkdownView
                style={styles.descriptionView}
                styles={descriptionStyles}
                onLinkPress={this.onLinkPress}
              >
                { description }
              </MarkdownView>
              { this.renderDetail('LEVEL', level && level.name) }
              { this.renderDetail('PREVIOUS KNOWLEDGE', knowledge) }
              { this.renderDetail('SOFTWARE', software) }
            </View>
            { this.renderSpeakers() }
          </View>
        </ScrollView>
      </Gradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.schedule.selectedEvent,
    currentTime: new Date(state.schedule.currentTime)
  };
};

export default connect(mapStateToProps)(TalkDetailScreen);
