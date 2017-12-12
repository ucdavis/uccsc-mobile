import React from 'react'
import {
  Image,
  Text,
  View,
  FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import ScheduleActions from '../Redux/ScheduleRedux'
import Talk from '../Components/Talk'
import styles from './Styles/ScheduleScreenStyles'

class ScheduleScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Schedule',
    tabBarIcon: ({ focused }) => (
      <Image source={focused ? Images.activeInfoIcon : Images.inactiveInfoIcon} />
    )
  }

  renderItem = ({item}) => {

    return (
      <Talk
        type={item.type}
        name={item.speaker}
        avatarURL={`https://infinite.red/images/chainreact/${item.image}.png`}
        title={item.title}
        start={item.time}
        duration={item.duration}
      />
    )
  }

  render () {
    return (
        <View style={styles.container}>
          <FlatList
            data={this.props.schedule}
            extraData={this.props}
            renderItem={this.renderItem}
            keyExtractor={(item, idx) => item.time}
            contentContainerStyle={styles.listContent}
            getItemLayout={this.getItemLayout}
          />
        </View>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    schedule: state.schedule.speakerSchedule,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getScheduleUpdates: () => dispatch(ScheduleActions.getScheduleUpdates()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleScreen)
