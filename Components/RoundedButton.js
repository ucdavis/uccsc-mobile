import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Styles/RoundedButtonStyle';

const RoundedButton = (props) => {
  const getText = () => {
    return props.text || props.children || '';
  };

  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}>
      <Text style={styles.buttonText}>{getText()}</Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;
