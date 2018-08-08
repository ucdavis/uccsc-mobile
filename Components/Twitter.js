import React from 'react';
import { View, TouchableOpacity, Text, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './Styles/TwitterStyle';

const tweetWithHashtag = async () => {
  const appURL = 'twitter://post?hashtags=UCCSC';
  const webURL = 'https://twitter.com/intent/tweet?hashtags=UCCSC';
  const supported = await Linking.canOpenURL(appURL);
  Linking.openURL(supported ? appURL : webURL);
};

const Twitter = (props) => {
  return (
    <View
      style={styles.container}
      accessible
    >
      <FontAwesome name="twitter" size={48} color="white" />
      <TouchableOpacity onPress={() => tweetWithHashtag()}>
        <Text style={styles.heading}>
          #UCCSC
        </Text>
      </TouchableOpacity>
      <Text style={styles.description}>
        Whenever you tweet about the conference, please use &nbsp;
        <Text style={styles.hashtag} onPress={() => tweetWithHashtag()} accessible>
          #UCCSC
        </Text>.
      </Text>
    </View>
  );
};

export default Twitter;
