import React from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import TalkInfo from "./TalkInfo";
import styles from "./Styles/TalkStyle";
import { Colors } from '../Themes/'

const themeColors = [
  Colors.darkGreen1,
  Colors.darkBlue1,
  Colors.darkPurple1
];

export default class Talk extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isActive: false,
      animatedSize: new Animated.Value(1)
    }
  }

  handlePressIn = () => {
    Animated.spring(this.state.animatedSize, {
      toValue: 1.05,
      useNativeDriver: true
    }).start();
  };

  handlePressOut = () => {
    Animated.spring(this.state.animatedSize, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { name, title, avatarURL, start, duration } = this.props;

    const animatedStyle = {
      transform: [{ scale: this.state.animatedSize }]
    }

    const themeColor = themeColors[(title || '').length % themeColors.length]

    const containerStyles = [
      styles.container,
      animatedStyle,
      {
        borderTopWidth: 15,
        borderTopColor: themeColor
      }
    ]

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
            <Image style={styles.avatar} source={{ uri: avatarURL }} />
          </View>
          <TalkInfo start={start} duration={duration} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
