import React from 'react';
import { View, Text, Image } from 'react-native';
import { format, getTime } from 'date-fns';

import AppConfig from '../Config/AppConfig';
import { Images, Videos } from '../Themes';

import Card from './Card';
import BackgroundVideo from './BackgroundVideo';
import styles from './Styles/MealStyle';

export default class Meal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLaidOut: false,
    };
  }

  onLayout = event => {
    const width = event.nativeEvent.layout.width;

    this.setState({
      isLaidOut: true,
      imageWidth: width,
    });
  };

  renderBackground() {
    const { type, title, image } = this.props;
    const { isLaidOut, imageWidth } = this.state;

    if (!isLaidOut) {
      return null;
    }

    let background = '';
    
    if (title.indexOf('Welcome Dinner') > -1) {
      background = Images.partyBreak;
    }
    else if (title.indexOf('Breakfast') > -1) {
      background = Images.breakfast;
    }
    else if (title.indexOf('Lunch') > -1) {
      background = Images.lunch;
    }
    else {
      background = Images.lunch;
    }

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
      start,
      end,
      isActive
    } = this.props;

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
        onLayout={this.onLayout}
        style={styles.container}
      >
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
    return (
      <Card>
        { this.renderContent() }
      </Card>
    );
  }
}
