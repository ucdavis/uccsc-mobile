import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/TalkInfoStyle'

const TalkInfo = (props) => {
    const { start, duration, remindMe, toggleRemindMe, isFinished, showWhenFinished } = props
  
    return (
      <View style={styles.container}>
        <View style={styles.details}>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>
              Start
            </Text>
            <Text style={styles.detailText}>
            </Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>
              Duration
            </Text>
            <Text style={styles.detailText}>
              {`${duration} Minutes`}
            </Text>
          </View>
        </View>
      </View>
    )
  }
  export default TalkInfo