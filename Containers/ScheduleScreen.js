import React from 'react'
import {
  Image,
  Text,
  View,
  FlatList
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import Config from '../Config/AppConfig'
import { Images } from '../Themes'
import ScheduleActions from '../Redux/ScheduleRedux'
import DayToggle from '../Components/DayToggle'
import Talk from '../Components/Talk'
import styles from './Styles/ScheduleScreenStyles'
import { GroupBy, FindIndexAll, Sum } from '../Utils/Array';
import { startOfDay, isSameDay, isWithinRange } from 'date-fns'

class ScheduleScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Schedule',
    tabBarIcon: ({ focused }) => (
      <MaterialIcons name="schedule" size={24} color="black" />
    )
  }

  constructor(props) {
    super(props)

    const { schedule, currentTime } = props
    const activeDay = 0
    const isCurrentDay = this.isActiveCurrentDay(currentTime, activeDay)

    const eventsByDay = this.buildScheduleList(schedule)

    this.state = {
      activeDay,
      isCurrentDay,
      eventsByDay
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.schedule != nextProps.schedule) {

      const { activeDay } = this.state
      const eventsByDay = this.buildScheduleList(schedule)

      this.setState({ eventsByDay })
    }
  }

  isActiveCurrentDay = (currentTime, activeDay) =>
    isSameDay(currentTime, new Date(Config.conferenceDates[activeDay]))

  buildScheduleList = (schedule) => {
    // presort events
    const sorted = [...schedule].sort((a, b) => a.time < b.time);

    // group events by day
    const byDay = GroupBy(sorted, (t => startOfDay(t.time)));

    // for each day, add headers
    const byDayWithHeaders = byDay.map(d => {
      const withHeaders = [];
      // group by timeslot
      GroupBy(d.values, (t => t.time))
        .forEach(group => {
          withHeaders.push({
            time: group.key,
            isHeader: true
          });
          withHeaders.push(...group.values);
        });
      return {
        key: d.key,
        values: withHeaders
      };
    });

    return byDayWithHeaders;
  }

  onEventPress = (item) => {
    const { navigation, setSelectedEvent } = this.props;

    setSelectedEvent(item);
    navigation.navigate('TalkDetail');
  }

  setActiveDay = (activeDay) => {
    const { currentTime } = this.props
    const { eventsByDay } = this.state
    const isCurrentDay = this.isActiveCurrentDay(currentTime, activeDay)

    this.setState({ activeDay, isCurrentDay }, () => {
      if (isCurrentDay) {
        // Scroll to active
        // const headersIndices = FindIndexAll(schedule, i => i.isHeader);
        // const index = this.getActiveIndex(data)
        // this.scheduleList.scrollToIndex({index, animated: false})
      } else {
        // Scroll to top
        this.scheduleList.scrollToOffset({y: 0, animated: false})
      }
    })
  }

  getItemLayout = (data, index) => {
    const item = data[index]
    const itemLength = (item, index) => {
      if (item.isHeader) {
        return 60;
      }

      if (item.type === 'talk') {
        // use best guess for variable height rows
        return 138 + (1.002936 * item.title.length + 6.77378)
      }

      return 154;
    }
    const length = itemLength(item)
    const offset = Sum(data.slice(0, index).map(itemLength))
    return { length, offset, index }
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
        onPress={() => this.onEventPress(item)}
      />
    );
  }

  render () {
    const { activeDay, eventsByDay } = this.state;

    const data = eventsByDay[activeDay].values;
    const headersIndices = FindIndexAll(data, i => i.isHeader);

    return (
        <View style={styles.container}>
          <DayToggle
            activeDay={activeDay} 
            onPressIn={this.setActiveDay}
          />
          <FlatList
            data={data}
            extraData={this.props}
            renderItem={this.renderItem}
            keyExtractor={(item, idx) => idx}
            stickyHeaderIndices={headersIndices}
            contentContainerStyle={styles.listContent}
            getItemLayout={this.getItemLayout}
            ref={(r) => this.scheduleList = r}
          />
        </View>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    // currentTime: new Date(state.schedule.currentTime),
    schedule: state.schedule.speakerSchedule,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getScheduleUpdates: () => dispatch(ScheduleActions.getScheduleUpdates()),
    setSelectedEvent: data => dispatch(ScheduleActions.setSelectedEvent(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleScreen)
