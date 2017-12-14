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
import { GroupBy, FindIndexAll } from '../Utils/Array';

class ScheduleScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Schedule',
    tabBarIcon: ({ focused }) => (
      <Image source={focused ? Images.activeInfoIcon : Images.inactiveInfoIcon} />
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      scheduleWithHeaders: this.getScheduleWithHeaders(props.schedule)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.schedule != nextProps.schedule) {
      this.setState({
        scheduleWithHeaders: this.getScheduleWithHeaders(props.schedule)
      })
    }
  }

  getScheduleWithHeaders = (schedule) => {
    const grouped = GroupBy(schedule, (t => t.time))
    const scheduleWithHeaders = [];
    Object.keys(grouped).forEach(time => {
      scheduleWithHeaders.push({
        time,
        isHeader: true
      });
      scheduleWithHeaders.push(...grouped[time]);
    });
    return scheduleWithHeaders;
  }

  renderItem = ({item}) => {

    if (item.isHeader) {
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.headerTime}>{item.time}</Text>
        </View>
      )
    }

    return (
      <Talk
        type={item.type}
        name={item.speaker}
        avatarURL={`https://infinite.red/images/chainreact/${item.image}.png`}
        title={item.title}
        start={item.time}
        duration={item.duration}
      />
    );
  }

  render () {
    const schedule = this.state.scheduleWithHeaders;
    const headersIndices = FindIndexAll(schedule, i => i.isHeader);

    return (
        <View style={styles.container}>
          <FlatList
            data={this.state.scheduleWithHeaders}
            extraData={this.props}
            renderItem={this.renderItem}
            keyExtractor={(item, idx) => idx}
            stickyHeaderIndices={headersIndices}
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
