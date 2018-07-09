import React from 'react';
import { View, Text } from 'react-native';
import format from 'date-fns/format';
import RemindMeButton from './RemindMeButton';
import styles from './Styles/TalkInfoStyle';

export default class TalkInfo extends React.PureComponent {
  render() {
    const { start, duration, showToggleReminder, toggleReminderData } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.details}>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>
              Start
            </Text>
            <Text style={styles.detailText}>
              { format(new Date(start), 'h:mm') }
            </Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>
              Duration
            </Text>
            <Text style={styles.detailText}>
              {duration}
            </Text>
          </View>
          { showToggleReminder &&
            <View style={styles.remindMe}>
                <RemindMeButton data={toggleReminderData} />
            </View>
          }
        </View>
      </View>
    );
  }
}
