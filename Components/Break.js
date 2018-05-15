import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { Images, Videos } from '../Themes';
import BackgroundVideo from './BackgroundVideo';
import { format, getTime } from 'date-fns';
import styles from './Styles/BreakStyle';

export default class Break extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageWidth: 335,
    };
  }

  onLayout = event => {
    const width = event.nativeEvent.layout.width;

    this.setState({
      imageWidth: width,
    });
  };

  renderContent() {
    const {
      type,
      title,
      duration,
      isCurrentDay,
      isActive,
      start,
      end,
    } = this.props;

    const containerStyles = [
      styles.container,
      isCurrentDay && styles.currentDay,
      isActive && styles.active,
    ];

    const background = Images[`${type}Break`];
    const video = Videos[type];
    const timeframe =
      duration <= 60
        ? `${duration} Minutes`
        : `${format(getTime(start), 'h:mm')} - ${format(
          getTime(end),
          'h:mma'
        )}`;
    const cellTitle =
      title || `${type.charAt(0).toUpperCase() + type.slice(1)} Break`;

    const imageWidth = this.state.imageWidth;

    return (
      <View>
        <View style={containerStyles} onLayout={this.onLayout}>
          <Image
            source={background}
            style={[styles.background, { width: imageWidth }]}
          />
          <BackgroundVideo
            source={video}
            style={styles.video}
            isActive={true}
          />
          <View style={styles.contentContainer}>
            <View style={styles.content}>
              <Text style={styles.heading}>{cellTitle}</Text>
              <Text style={styles.duration}>{timeframe}</Text>
            </View>
            {this.renderSponsor()}
          </View>
        </View>
      </View>
    );
  }

  renderSponsor() {
    const { sponsor } = this.props;

    if (!sponsor) {
      return null;
    }

    return (
      <View style={styles.sponsor}>
        <Image source={Images[sponsor.icon]} />
        <Text style={styles.sponsorText}>{sponsor.text}</Text>
      </View>
    );
  }

  render() {
    if (this.props.onPress) {
      return (
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          {this.renderContent()}
        </TouchableWithoutFeedback>
      );
    }

    return this.renderContent();
  }
}
