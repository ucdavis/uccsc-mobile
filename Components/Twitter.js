import React from 'react';
import { View, TouchableOpacity, Text, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './Styles/TwitterStyle';

const tweetWithHashtag = async () => {
  const appURL = 'twitter://post?hashtags=UCCSC2018';
  const webURL = 'https://twitter.com/intent/tweet?hashtags=UCCSC2018';
  const supported = await Linking.canOpenURL(appURL);
  Linking.openURL(supported ? appURL : webURL);
};

const Twitter = (props) => {
  return (
    <View style={styles.container}>
      <FontAwesome name="twitter" size={48} color="white" />
      <TouchableOpacity onPress={() => tweetWithHashtag()}>
        <Text style={styles.heading}>
          #UCCSC2018
        </Text>
      </TouchableOpacity>
      <Text style={styles.description}>
        Make your friends jealous by tweeting, posting,
        or whatever it is you do with the hashtag&nbsp;
        <Text style={styles.hashtag} onPress={() => tweetWithHashtag()}>
          #uccsc2018
        </Text>.
      </Text>
    </View>
  );
};

export default Twitter;
