import React from 'react';
import {
  Image, View,
} from 'react-native';
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator, SafeAreaView } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { isSameDay } from 'date-fns';

import Config from '../Config/AppConfig';
import { Colors } from '../Themes';
import ScheduleActions from '../Redux/ScheduleRedux';
import { accessibilityFocusRef } from '../Helpers/AccessibilityHelpers';

import Gradient from '../Components/Gradient';
import ScheduleList from '../Components/ScheduleList';
import FavoritesScreen from './FavoritesScreen';

import styles from './Styles/ScheduleScreenStyles';

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

const MondayScheduleList = connect(mapStoreToPropsForList(0), mapDispatchToPropsForList)(ScheduleList);
const TuesdayScheduleList = connect(mapStoreToPropsForList(1), mapDispatchToPropsForList)(ScheduleList);
const WednesdayScheduleList = connect(mapStoreToPropsForList(2), mapDispatchToPropsForList)(ScheduleList);

const DayTabs = {
  Monday: {
    screen: MondayScheduleList,
    navigationOptions: {
      tabBarLabel: 'Mon',
      tabBarAccessibilityLabel: 'Monday Schedule',
    },
  },
  Tuesday: {
    screen: TuesdayScheduleList,
    navigationOptions: {
      tabBarLabel: 'Tue',
      tabBarAccessibilityLabel: 'Tuesday Schedule',
    },
  },
  Wednesday: {
    screen: WednesdayScheduleList,
    navigationOptions: {
      tabBarLabel: 'Wed',
      tabBarAccessibilityLabel: 'Wednesday Schedule',
    },
  },
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: {
      tabBarAccessibilityLabel: 'Favorited Talks',
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

onTabBarPressListeners = [];
function onTabBarPress(navigation) {
  onTabBarPressListeners.forEach(l => l(navigation));
}

export default class ScheduleScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Home',
    tabBarLabel: 'Schedule',
    tabBarAccessibilityLabel: 'Schedule Tab. Button.',
    tabBarIcon: ({ focused }) => (
      <MaterialIcons
        name="schedule"
        size={24}
        color="white"
      />
    ),
  }

  constructor(props) {
    super(props);

    this.state = {
      isFocused: this.props.navigation.isFocused(),
    };
  }

  componentDidMount() {
    this.navigationBlurListener =  this.props.navigation.addListener('didBlur', this.onNavigationChanged);
    this.navigationFocusListener =  this.props.navigation.addListener('didFocus', this.onNavigationChanged);
  } 
  
  componentWillUnmount() {
    if (this.navigationBlurListener) {
      this.navigationBlurListener.remove();
    }

    if (this.navigationFocusListener) {
      this.navigationFocusListener.remove();
    }
  }

  onNavigationChanged = (payload) => {
    const isFocused = this.props.navigation.isFocused();
    this.setState({
      isFocused,
    });

    const isInit = payload.action.type === 'Navigation/INIT';
    if (!isInit && isFocused) {
      accessibilityFocusRef(this._dayTabNavigator);
    }
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
