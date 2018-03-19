import React from "react";
import { NavigationActions } from 'react-navigation'
import {
  BackHandler,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import TalkInfo from '../Components/TalkInfo';
import { Images } from '../Themes'
import { connect } from "react-redux";
import styles from './Styles/TalkDetailScreenStyles';

class TalkDetail extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Schedule",
    tabBarIcon: ({ focused }) => (
      <MaterialIcons name="schedule" size={24} color="black" />
    ),
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  renderSpeakers = () => {
    const { speakers } = this.props;

    return (
      <View>
        { speakers.map(s => {
          const id = '00000000000000000000000000000000';
          return (
            <View key={s.name}>
              <View>
                <Image
                  style={styles.avatar}
                  source={{ uri: `https://www.gravatar.com/avatar/${id}?d=mm&s=100` }}
                />
                <Text>{s.name}</Text>
                <Text>{s.company}</Text>
              </View>
              <View>
                <Text>{s.bio}</Text>
              </View>
            </View>
          );
        }) }
      </View>
    );
  }

  render() {
    const { title, description, eventStart, setReminder, removeReminder } = this.props;

    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={this.goBack}>
            <Image style={styles.backButtonIcon} source={Images.arrowIcon} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.cardShadow1} />
          <View style={styles.cardShadow2} />
          <Image
            style={styles.avatar}
            source={{
              uri: `https://infinite.red/images/chainreact/${this.props.image}.png`
            }}
          />
          <View style={styles.card}>
            <Text style={styles.sectionHeading}>TALK</Text>
            <Text style={styles.heading}>{title}</Text>
            <Text style={styles.description}>{ description }</Text>
            <Text style={styles.sectionHeading}>ABOUT</Text>
            { this.renderSpeakers() }
          </View>
          <TalkInfo
            start={new Date(this.props.eventStart)}
            duration={this.props.duration}
          />
        </View>
      </ScrollView>
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
