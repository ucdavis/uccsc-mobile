import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/DayToggleStyle'

const DayToggle = props => {
  const { activeDay, onPressIn } = props
  const dayStyle = (day) =>
    activeDay === day ? styles.activeDay : styles.inactiveDay

  return (
    <View
      style={styles.headerGradient}>
      <View style={styles.dayToggle}>
        <TouchableOpacity onPressIn={() => onPressIn(0)}>
          <Text style={dayStyle(0)}>Monday</Text>
        </TouchableOpacity>
        <TouchableOpacity onPressIn={() => onPressIn(1)}>
          <Text style={dayStyle(1)}>Tuesday</Text>
        </TouchableOpacity>
        <TouchableOpacity onPressIn={() => onPressIn(2)}>
          <Text style={dayStyle(2)}>Wednesday</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DayToggle