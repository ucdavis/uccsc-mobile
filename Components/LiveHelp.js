import React from 'react';
import { View, Text, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import RoundedButton from './RoundedButton';
import styles from './Styles/LiveHelpStyle';

export default class LiveHelp extends React.Component {
  onSlackClick = async () => {
    
    // Slack doesn't support directing users to a channel unless they're already signed in.
    // Otherwise it produces a "Workspace not found" error.
    // Best we can hope for is to sent them to the default channel
    // const teamId = 'T0BMNCSBA';
    // const channelId = 'C4KM6NJ78';
    // const appURL = `slack://channel?team=${teamId}&id=${channelId}`;
    // const webURL = `https://uctech.slack.com/app_redirect?channel=${channelId}`;
    // const supported = await Linking.canOpenURL(appURL);
    // Linking.openURL(supported ? appURL : webURL);

    
    const webURL = `https://uctech.slack.com/`;
    Linking.openURL(webURL);
  }

  render() {
    return (
      <View style={styles.liveHelp}>
        <Text style={styles.header} onPress={this.onSlackClick}>
          <FontAwesome name="slack" size={31} color="white" /> UC Tech Slack
        </Text>
        <Text style={styles.liveHelpText}>
          Stay in touch with conference organizers and attendees on the #UCCSC channel at uctech.slack.com. Anyone with a University of California email address can join automatically.
        </Text>
        <Text style={styles.liveHelpText}>
          Find us in the #uccsc channel!
        </Text>
        <RoundedButton
          text='Join or Login'
          onPress={this.onSlackClick}
          style={styles.liveHelpButton}
        />
      </View>
    );
  }
}
