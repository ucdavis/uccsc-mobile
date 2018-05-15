import React from 'react';
import { NavigationActions } from 'react-navigation';
import {
  BackHandler,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AppConfig from '../Config/AppConfig';
import Gradient from '../Components/Gradient';
import RoomInfo from '../Components/RoomInfo';
import TalkInfo from '../Components/TalkInfo';
import { Images } from '../Themes';
import { connect } from 'react-redux';
import styles from './Styles/TalkDetailScreenStyles';

class TalkDetail extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Schedule',
    tabBarIcon: ({ focused }) => (
      <MaterialIcons name="schedule" size={24} color="white" />
    ),
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.goBack);
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

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

    return (
      <View style={styles.speakersContainer}>
        <Text style={styles.sectionHeading}>ABOUT</Text>
        { speakers.map(s => {
          const id = '00000000000000000000000000000000';
          return (
            <View key={s.name} style={styles.speakerContainer}>
              <View style={styles.avatarContainer}>
                { this.renderAvatar(s) }
              </View>
              <View style={styles.speakerInfo}>
                <Text style={styles.speakerName}>{s.name}</Text>
                <Text style={styles.speakerCompany}>{s.company}</Text>
                <Text style={styles.speakerBio}>{s.bio}</Text>
              </View>
            </View>
          );
        }) }
      </View>
    );
  }

  render() {
    const { title, description, time, duration, room } = this.props;
    return (
      <Gradient style={styles.main}>
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={this.goBack}>
              <MaterialIcons name="chevron-left" size={24} style={styles.backButtonIcon} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.cardShadow1} />
            <View style={styles.cardShadow2} />
            <View style={styles.card}>
              <Text style={styles.sectionHeading}>TALK</Text>
              <Text style={styles.heading}>{ title }</Text>
              <TalkInfo
                start={time}
                duration={duration}
                style={styles.talkInfo}
              />
              <RoomInfo
                building={room.building}
                room={room.room}
                style={styles.roomInfo}
              />
              <Text style={styles.description}>{ description }</Text>
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

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TalkDetail);
