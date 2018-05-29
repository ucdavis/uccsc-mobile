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
import styles from './Styles/ActivityDetailScreenStyles';

class ActivityDetail extends React.Component {
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

  render() {
    const { title, description, time, duration, venue, eventType } = this.props;
    return (
      <Gradient style={styles.container}>
        <ScrollView>
          <View style={styles.main}>
            <TouchableOpacity style={styles.backButton} onPress={this.goBack}>
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
              <TalkInfo start={time} duration={duration} />
            </View>
            <View style={styles.section}>
              <RoomInfo building={venue.building} room={venue.room} />
            </View>
            <View style={styles.section}>
              <Text style={styles.description}>{ description }</Text>
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

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetail);
