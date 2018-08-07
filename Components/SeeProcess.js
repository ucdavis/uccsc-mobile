import React from 'react';
import { Text, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import { StackActions } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import ScheduleActions from '../Redux/ScheduleRedux';
import * as NavigationService from '../Services/NavigationService';

import styles from './Styles/SeeProcessStyle';

class SeeProcess extends React.Component {
  onPress = () => {
    const { setSelectedEvent, talk } = this.props;
    
    setSelectedEvent(talk);
    NavigationService.navigate({ routeName: 'Schedule', action: StackActions.push({ routeName: 'TalkDetail' }) });
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.processContainer}
        onPress={this.onPress}
        accessible
        accessibilityLabel='See the process behind making our app. Click to view the talk details. Button.'
        accessibilityTraits='button'
        accessibilityComponentType='button'
      >
        <FontAwesome name="code-fork" size={24} color="white" style={styles.codeIcon} />
        <Text style={styles.text}>See the process behind making our app</Text>
        <FontAwesome name="long-arrow-right" size={24} color="white" style={styles.rightArrow} />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (store) => {
  const talk = store.schedule.talks.find(t => t.title === 'Creating the UCCSC 2018 Mobile App');
  return {
    talk
  };
};

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  setSelectedEvent: (talk) => dispatch(ScheduleActions.setSelectedEvent(talk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SeeProcess);
