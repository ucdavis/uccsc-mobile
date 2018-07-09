import React from 'react';
import { View, Text, Linking } from 'react-native';
import RoundedButton from './RoundedButton';
import styles from './Styles/LiveHelpStyle';

const LiveHelp = (props) => {
  return (
    <View style={styles.liveHelp}>
      <Text style={styles.liveHelpPhone}>
        (530) 555-1234
      </Text>
      <Text style={styles.liveHelpText}>
        Text or call us at anytime for directions, suspicious activity,
        violations of our <Text style={styles.link} onPress={() => Linking.openURL('https://occr.ucdavis.edu/poc/')}>Principles of Community</Text>, or any other concern.
      </Text>
      <RoundedButton
        text='Send Text Message (SMS)'
        onPress={() => Linking.openURL('sms:5305551234')}
        style={styles.liveHelpButton}
      />
      <RoundedButton
        text='Give Us A Call'
        onPress={() => Linking.openURL('tel:5305551234')}
        style={styles.liveHelpButton}
      />
    </View>
  );
};

export default LiveHelp;
