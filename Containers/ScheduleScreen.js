import React from 'react';
import {
  Image, View,
} from 'react-native';
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator, SafeAreaView } from 'react-navigation';
import { isSameDay } from 'date-fns';
import { compose, withProps } from 'recompose';

import Config from '../Config/AppConfig';
import { Colors } from '../Themes';
import ScheduleActions from '../Redux/ScheduleRedux';
import { accessibilityFocusRef } from '../Helpers/AccessibilityHelpers';
import { addActionListener, emitAction } from '../Services/NavigationService';

import Gradient from '../Components/Gradient';
import ScheduleList from '../Components/ScheduleList';
import FavoritesScreen from './FavoritesScreen';

import styles from './Styles/ScheduleScreenStyles';
import { withTimer } from '../Helpers/WithTimer';

const mapStoreToPropsForList = (dayIndex) => (store) => {
  return {
    currentTime: new Date(store.schedule.currentTime),
    isCurrentDay: isSameDay(store.schedule.currentTime, new Date(Config.conferenceDates[dayIndex])),
    schedule: store.schedule.schedule[dayIndex],
  };
};

const mapDispatchToPropsForList = (dispatch) => {
  return {
    setSelectedEvent: data => dispatch(ScheduleActions.setSelectedEvent(data)),
  };
};

const MondayScheduleList = 
  compose(
    withProps({ routeName: 'Monday' }),
    connect(mapStoreToPropsForList(0), mapDispatchToPropsForList))
  (ScheduleList);

const TuesdayScheduleList =
  compose(
    withProps({ routeName: 'Tuesday' }),
    connect(mapStoreToPropsForList(1), mapDispatchToPropsForList))
  (ScheduleList);

const WednesdayScheduleList =
  compose(
    withProps({ routeName: 'Wednesday' }),
    connect(mapStoreToPropsForList(2), mapDispatchToPropsForList))
  (ScheduleList);

const DayTabs = {
  Monday: {
    screen: MondayScheduleList,
    navigationOptions: {
      tabBarLabel: 'Mon',
      tabBarAccessibilityLabel: 'Monday Schedule',
      tabBarOnPress: ({ navigation, defaultHandler }) => { emitAction(navigation.state); defaultHandler(); },
    },
  },
  Tuesday: {
    screen: TuesdayScheduleList,
    navigationOptions: {
      tabBarLabel: 'Tue',
      tabBarAccessibilityLabel: 'Tuesday Schedule',
      tabBarOnPress: ({ navigation, defaultHandler }) => { emitAction(navigation.state); defaultHandler(); },
    },
  },
  Wednesday: {
    screen: WednesdayScheduleList,
    navigationOptions: {
      tabBarLabel: 'Wed',
      tabBarAccessibilityLabel: 'Wednesday Schedule',
      tabBarOnPress: ({ navigation, defaultHandler }) => { emitAction(navigation.state); defaultHandler(); },
    },
  },
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: {
      tabBarAccessibilityLabel: 'Favorited Talks',
      tabBarOnPress: ({ navigation, defaultHandler }) => { emitAction(navigation.state); defaultHandler(); },
    },
  }
};

const DayTabNavigatorOptions = {
  lazy: false,
  animationEnabled: false,
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: Colors.snow,
    inactiveTintColor: 'rgba(255,255,255,0.80)',
    showIcon: true,
    indicatorStyle: {
      backgroundColor: Colors.snow
    },
    labelStyle: {
      fontSize: 16,
      letterSpacing: 0,
      fontFamily: 'Montserrat-Light',
      backgroundColor: Colors.clear,
    },
    iconStyle: {
      marginBottom: 8,
    },
    tabStyle: {
      flex: 1,
      height: 70,
      alignItems: 'center',
      justifyContent: 'flex-end',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(253,229,255,0.5)',
    },
    style: {
      backgroundColor: Colors.blue,
    }
  }
};

const DayTabNavigator = createMaterialTopTabNavigator(DayTabs, {
  ...DayTabNavigatorOptions,
  initialRouteName: 'Monday',
});

class ScheduleScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isFocused: this.props.navigation.isFocused(),
    };
  }

  componentDidMount() {
    this.navigationFocusListener = addActionListener((payload) => this.onNavigationChanged(payload));

    if (this.props.navigation.isFocused()) {
      this.accessibilityFocusTop();
    }
  }

  componentWillUnmount() {
    if (this.navigationFocusListener) {
      this.navigationFocusListener.remove();
    }
  }

  onNavigationChanged = (payload) => {
    if (payload.key === 'Schedule') {
      this.accessibilityFocusTop();
    }
  }

  accessibilityFocusTop = () => {
    this.props.timer.setTimeout(() => accessibilityFocusRef(this._dayTabNavigator), 100);
  }

  renderHeader = () => {
    return (
      <View style={styles.headerContainer} importantForAccessibility='no-hide-descendants'>
        <Image source={require('../Images/gradient.png')} style={styles.headerBackground} resizeMode="cover" />
      </View>
    );
  }

  render() {
    const { isFocused } = this.state;

    return (
      <Gradient style={styles.container}>
        { this.renderHeader() }
        <SafeAreaView style={styles.safeArea}>
          <View
            style={{flex: 1}}
            accessibilityElementsHidden={!isFocused}
            importantForAccessibility={isFocused ? 'auto' : 'no-hide-descendants'}
          >
            <DayTabNavigator
              screenProps={{ rootNavigation: this.props.navigation }}
              ref={r => this._dayTabNavigator = r}
            />
          </View>
        </SafeAreaView>
      </Gradient>
    );
  }
}

export default withTimer(ScheduleScreen);
