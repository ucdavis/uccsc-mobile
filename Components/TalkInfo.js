import React from 'react';
import { View, Text } from 'react-native';
import format from 'date-fns/format';
import RemindMeButton from './RemindMeButton';
import styles from './Styles/TalkInfoStyle';

export default class TalkInfo extends React.PureComponent {
  render() {
    const { showDay, start, duration, showToggleReminder, toggleReminderData } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.details}>
          { showDay &&
            <View
              style={styles.detail}
              accessible
              accessibilityLabel={`Day: ${format(new Date(start), 'dddd')}.`}
            >
              <Text style={styles.detailLabel}>
                Day
              </Text>
              <Text style={styles.detailText}>
                { format(new Date(start), 'ddd') }
              </Text>
            </View>
          }
          { start &&
            <View
              style={styles.detail}
              accessible
              accessibilityLabel={`Start time: ${format(new Date(start), 'h:mma')}.`}
            >
              <Text style={styles.detailLabel}>
                Start
              </Text>
              <Text style={styles.detailText}>
                { format(new Date(start), 'h:mma') }
              </Text>
            </View>
          }
          { duration &&
            <View
              style={styles.detail}
              accessible
              accessibilityLabel={`Duration: ${duration}.`}
            >
              <Text style={styles.detailLabel}>
                Duration
              </Text>
              <Text style={styles.detailText}>
                {duration}
              </Text>
            </View>
          }
        </View>
        { showToggleReminder &&
          <View style={styles.remindMe}>
              <RemindMeButton data={toggleReminderData} />
          </View>
        }
      </View>
    );
  }
}
