import React from 'react'
import {
  Image,
  Text,
  View,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Images } from '../Themes'
import styles from './Styles/AboutScreenStyle'

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'General Info',
    tabBarIcon: ({ focused }) => (
      <MaterialIcons name="map" size={24} color="black" />
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
