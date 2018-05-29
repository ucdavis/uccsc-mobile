import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { format, getTime } from 'date-fns';

import AppConfig from '../Config/AppConfig';
import { Images, Videos } from '../Themes';
import BackgroundVideo from './BackgroundVideo';

import styles from './Styles/ActivityStyle';

export default class Activity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageWidth: 335,
    };
  }

  shouldComponentUpdate(nextProps) {
    const {
      type,
      title,
      duration,
      image,
      isCurrentDay,
      isActive,
      start,
      end,
    } = this.props;

    if (nextProps.type !== type) {
      return true;
    }
    if (nextProps.title !== title) {
      return true;
    }
    if (nextProps.duration !== duration) {
      return true;
    }
    if (nextProps.image !== image) {
      return true;
    }
    if (nextProps.isCurrentDay !== isCurrentDay) {
      return true;
    }
    if (nextProps.isActive !== isActive) {
      return true;
    }
    if (nextProps.start !== start) {
      return true;
    }
    if (nextProps.end !== end) {
      return true;
    }

    return false;
  }

  onLayout = event => {
    const width = event.nativeEvent.layout.width;

    this.setState({
      imageWidth: width,
    });
  };

  renderBackground() {
    const { type, title, image } = this.props;

    let background = '';
    
    if (title.indexOf('Welcome Dinner') > -1) {
      background = Images.partyBreak;
    }
    else if (title.indexOf('Breakfast') > -1) {
      background = Images.breakfast;
    }
    if (title.indexOf('Lunch') > -1) {
      background = Images.lunch;
    }
    else if (title.indexOf('Yoga') > -1) {
      background = Images.morningYoga;
    }
    else if (title.indexOf('Jog') > -1) {
      background = Images.morningJog;
    }
    else if (title.indexOf('Bus') > -1) {
      background = Images.busTour;
    }
    else if (title.indexOf('Bowling') > -1) {
      background = Images.bowling;
    }
    // else if (image) {
    //   background = { uri: `${AppConfig.conferenceUrl}/${image.uri}` };
    // }
    else {
      background = (title.length % 2) ? Images.meetup1 : Images.meetup2;
    }

    const imageWidth = this.state.imageWidth;

    return (
      <Image
        source={background}
        style={[styles.background, { width: imageWidth }]}
      />
    );
  }

  renderContent() {
    const {
      type,
      title,
      duration,
      image,
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

    // const video = Videos[type];
    
    const timeframe =
      duration <= 60
        ? `${duration} Minutes`
        : `${format(getTime(start), 'h:mm')} - ${format(
          getTime(end),
          'h:mma'
        )}`;

    return (
      <View
        renderToHardwareTextureAndroid
        shouldRasterizeIO
      >
        <View style={containerStyles} onLayout={this.onLayout}>
          { this.renderBackground() }
          {/* <BackgroundVideo
            source={video}
            style={styles.video}
            isActive={true}
          /> */}
          <View style={styles.contentContainer}>
            <View style={styles.content}>
              <Text style={styles.heading}>{title}</Text>
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
        <Image style={styles.sponsorIcon} source={Images[sponsor.icon]} />
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
