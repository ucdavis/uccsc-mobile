import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Images } from '../Themes';
import styles from './Styles/RemindMeButtonStyle';

const RemindMeButton = (props) => {
  const { on, onPress } = props;
  const icon = on ? 'star' : 'star-o';
  const buttonText = on ? 'Turn Off' : 'Remind Me';

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, on && styles.activeButton]}>
        <FontAwesome name={icon} style={styles.star} />
        <Text style={[styles.text, on && styles.activeText]}>
          {buttonText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RemindMeButton;
