import React from 'react';
import { View, Text } from 'react-native';
import styles from './Styles/ScheduleSectionHeaderStyle';
import { format } from 'date-fns';

export default class ScheduleSectionHeader extends React.PureComponent {
  render() {
    const { time } = this.props;
    const header = format(time, "h:mm A");
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.headerTime}>{ header }</Text>
      </View>
    );
  }
}
