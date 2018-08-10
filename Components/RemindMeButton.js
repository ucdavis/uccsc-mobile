import React from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './Styles/RemindMeButtonStyle';

import NotificationActions from '../Redux/NotificationRedux';
import ScheduleActions from '../Redux/ScheduleRedux';
import PushNotifications from '../Services/PushNotifications';

class RemindMeButton extends React.PureComponent {

  onTogglePress = async () => {
    const { starred, notification, data } = this.props;
    const { title } = data;

    const { starTalk, unstarTalk, trackLocalNotification, untrackLocalNotification } = this.props;
  
    // trigger starred status
    if (!starred) {
      starTalk(title);
    } else {
      unstarTalk(title);
    }
  
    // create schedule local notification, track it
    if (!starred) {
      const id = await PushNotifications.scheduleTalkReminder(data);
      trackLocalNotification(id, title);
      return;
    }
  
    // find local notification, cancel it
    if (notification) {
      await PushNotifications.cancelNotification(notification.id);
      untrackLocalNotification(notification.id);
    }
  }

  render() {
    const { starred } = this.props;
    const icon = starred ? 'star' : 'star-o';
    const buttonText = starred ? 'Unfollow' : 'Remind Me';

    const starStyle = [styles.text, starred && styles.activeText];
    const textStyle = [styles.text, starred && styles.activeText];

    const accessibilityLabel = starred ? 'Favorite Talk. On. Double tap to unfavorite.' : 'Favorite Talk. Off. Double tap to favorite.';

    return (
      <TouchableOpacity
        onPress={this.onTogglePress}
        style={[styles.button, starred && styles.activeButton]}
        accessible
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits='button'
        accessibilityComponentType='button'
      >
        <FontAwesome name={icon} style={starStyle} />
        <Text style={textStyle}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    );
  }
}

const mapStoreToProps = (store, ownProps) => {
  const { title } = ownProps.data;

  const starred = store.schedule.starredTalks.indexOf(title) > -1;
  const notification = store.notifications.localNotifications.find(n => n.title === title);

  return {
    starred,
    notification,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    starTalk: title => dispatch(ScheduleActions.starTalk(title)),
    unstarTalk: title => dispatch(ScheduleActions.unstarTalk(title)),
    trackLocalNotification: (id, title) =>
      dispatch(NotificationActions.trackLocalNotification(id, title)),
    untrackLocalNotification: (id) => dispatch(NotificationActions.untrackLocalNotification(id)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(RemindMeButton);
