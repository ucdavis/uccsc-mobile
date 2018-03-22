import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Images } from '../Themes';
import styles from './Styles/SeeProcessStyle';

const onPress = () => {
  const url = 'https://shift.infinite.red/making-the-react-native-conference-app-in-react-native-9afd36be3681';
  Linking.openURL(url);
};

const SeeProcess = (props) => {
  return (
    <TouchableOpacity style={styles.processContainer} onPress={onPress}>
      <View style={styles.leftContainer}>
        <FontAwesome name="code-fork" size={24} color="white" style={styles.codeIcon} />
        <Text style={styles.text}>See the process behind making our app</Text>
      </View>
      <FontAwesome name="long-arrow-right" size={24} color="white" style={styles.rightArrow} />
    </TouchableOpacity>
  );
};

export default SeeProcess;
