import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import TalkInfo from './TalkInfo';
import styles from './Styles/TalkStyle';
import AppConfig from '../Config/AppConfig';
import { Colors } from '../Themes/';

const themeColors = [
  Colors.darkGreen1,
  Colors.darkBlue1,
  Colors.darkPurple1,
];

export default class Talk extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      animatedSize: new Animated.Value(1),
    };
  }

  shouldComponentUpdate(nextProps) {
    const { name, title, avatarURL, start, duration, starred } = this.props;
    if (nextProps.name !== name) {
      return true;
    }
    if (nextProps.title !== title) {
      return true;
    }
    if (nextProps.avatarURL !== avatarURL) {
      return true;
    }
    if (nextProps.start !== start) {
      return true;
    }
    if (nextProps.duration !== duration) {
      return true;
    }

    if (nextProps.starred !== starred) {
      return true;
    }

    return false;
  }

  handlePressIn = () => {
    Animated.spring(this.state.animatedSize, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  handlePressOut = () => {
    Animated.spring(this.state.animatedSize, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { name, title, avatarUrl, start, duration, starred, toggleReminder } = this.props;
    console.log(avatarUrl);
    const animatedStyle = {
      transform: [{ scale: this.state.animatedSize }],
    };

    const themeColor = themeColors[(title || '').length % themeColors.length]

    const containerStyles = [
      styles.container,
      animatedStyle,
      {
        borderTopWidth: 15,
        borderTopColor: themeColor,
      },
    ];

    return (
      <TouchableWithoutFeedback
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={this.props.onPress}
      >
        <Animated.View style={containerStyles}>
          <View style={styles.info}>
            <View style={styles.infoText}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.name}>{name}</Text>
            </View>
            <Image style={styles.avatar} source={{ uri: avatarUrl || '' }} />
          </View>
          <TalkInfo start={start} duration={duration} starred={starred} toggleReminder={toggleReminder} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
