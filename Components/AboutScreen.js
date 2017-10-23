import React from 'react'
import {
  Image,
  Text,
  View,
} from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/AboutScreenStyle'

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'General Info',
    tabBarIcon: ({ focused }) => (
      <Image source={focused ? Images.activeInfoIcon : Images.inactiveInfoIcon} />
    )
  }

  render () {
    return (
        <View style={styles.container}>
          <Text style={styles.sectionText}>About Screen</Text>
        </View>
      )
  }
}
