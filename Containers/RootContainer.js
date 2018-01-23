import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
// import StartupActions from '../Redux/StartupRedux'
// import ReduxPersist from '../Config/ReduxPersist'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import styles from './Styles/RootContainerStyles'
import { registerForPushNotificationsAsync } from '../Services/PushNotifications';

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    // if (!ReduxPersist.active) {
    //   this.props.startup()
    // }

    await registerForPushNotificationsAsync();

  }

  render () {
    return (
      <View style={styles.applicationView}>
        <View style={styles.statusBarPadder} />
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
})

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  // startup: () => dispatch(StartupActions.startup()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
