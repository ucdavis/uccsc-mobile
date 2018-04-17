import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Images } from '../Themes';
import styles from './Styles/RemindMeButtonStyle';

const RemindMeButton = (props) => {
  const { on, onPress } = props;
  const icon = on ? 'star' : 'star-o';
  const buttonText = on ? 'Unfollow' : 'Remind Me';

  const starStyle = [styles.text, on && styles.activeText];
  const textStyle = [styles.text, on && styles.activeText];

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, on && styles.activeButton]}>
      <FontAwesome name={icon} style={starStyle} />
      <Text style={textStyle}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default RemindMeButton;
