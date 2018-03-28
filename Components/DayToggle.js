import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles/DayToggleStyle';

const DayToggle = props => {
  const { activeDay, onPressIn } = props;

  const itemStyle = (day) => [
    styles.item,
    activeDay === day ? styles.activeItem : null,
  ];

  const textStyle = (day) => [
    styles.text,
    activeDay === day ? styles.activeText : null,
  ]

  return (
    <View style={styles.dayToggle}>
      <TouchableOpacity onPressIn={() => onPressIn(0)} style={itemStyle(0)}>
        <Text style={textStyle(0)}>Mon</Text>
      </TouchableOpacity>
      <TouchableOpacity onPressIn={() => onPressIn(1)} style={itemStyle(1)}>
        <Text style={textStyle(1)}>Tue</Text>
      </TouchableOpacity>
      <TouchableOpacity onPressIn={() => onPressIn(2)} style={itemStyle(2)}>
        <Text style={textStyle(2)}>Wed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DayToggle;
