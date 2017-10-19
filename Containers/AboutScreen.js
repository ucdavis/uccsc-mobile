import React from 'react'
import {
  Image,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import styles from './Styles/AboutScreenStyle'

class AboutScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'General Info',
    tabBarIcon: ({ focused }) => (
      <Image source={focused ? Images.activeInfoIcon : Images.inactiveInfoIcon} />
    )
  }

  render () {
    return (
        <View style={styles.container}>
        </View>
      )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen)
