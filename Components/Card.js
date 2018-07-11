import React from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import styles from './Styles/CardStyle';

export default class Card extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      animatedSize: new Animated.Value(1),
    };
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
    const { isCurrentDay, isActive } = this.props;

    const animatedStyle = {
      transform: [{ scale: this.state.animatedSize }],
    };

    const containerStyles = [
      styles.container,
      isCurrentDay && styles.currentDay,
      isActive && styles.active,
      animatedStyle,
      this.props.style,
    ];

    return (
      <TouchableWithoutFeedback
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={this.props.onPress}
      >
        <Animated.View style={containerStyles}>
          { this.props.children }
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
