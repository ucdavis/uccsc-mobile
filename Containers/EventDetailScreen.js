import React from 'react';
import { connect } from 'react-redux';
import { StackActions } from 'react-navigation';
import {
  BackHandler,
  ScrollView,
  Text,
  View,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MarkdownView } from 'react-native-markdown-view';
import { MaterialIcons } from '@expo/vector-icons';

import AppConfig from '../Config/AppConfig';
import { accessibilityFocusRef } from '../Helpers/AccessibilityHelpers';
import { withTimer } from '../Helpers/WithTimer';

import Gradient from '../Components/Gradient';
import RoomInfo from '../Components/RoomInfo';
import TalkInfo from '../Components/TalkInfo';

import styles from './Styles/EventDetailScreenStyles';

class EventDetailScreen extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.goBack);

    // focus on top of page, the back button
    this.props.timer.setTimeout(() => accessibilityFocusRef(this._backButton), 100);
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

  render() {
    const { title, description, venue, eventType, time, duration } = this.props;

    const descriptionStyles = {
      link: StyleSheet.flatten(styles.descriptionLink),
      paragraph: StyleSheet.flatten(styles.descriptionText),
    };

    return (
      <Gradient style={styles.gradient}>
        <ScrollView
          accessibilityViewIsModal
          importantForAccessibility='yes'
        >
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={this.goBack}
              ref={r => this._backButton = r}
            >
              <MaterialIcons name="chevron-left" size={24} style={styles.backButtonIcon} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.cardShadow1} />
            <View style={styles.cardShadow2} />
            <View style={styles.card}>
              <Text style={styles.sectionHeading}>{ eventType }</Text>
              <Text style={styles.heading}>{ title }</Text>
            </View>
            <View style={styles.section}>
              <TalkInfo showDay start={time} duration={duration} />
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
            </View>
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

export default withTimer(connect(mapStateToProps)(EventDetailScreen));
