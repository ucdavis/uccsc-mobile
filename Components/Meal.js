import React from 'react';
import { View, Text, Image } from 'react-native';
import { format, getTime } from 'date-fns';

import { Images } from '../Themes';

import Card from './Card';
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
    const { title } = this.props;
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
          {this.renderSponsors()}
        </View>
      </View>
    );
  }

  renderSponsors() {
    const { sponsors } = this.props;

    if (!sponsors || !sponsors.length) {
      return null;
    }

    return (
      <View style={styles.sponsors}>
        <Text style={styles.sponsorHeading}>Sponsored By:</Text>
        { sponsors.map(s => this.renderSponsor(s)) }
      </View>
    );
  }

  renderSponsor(sponsor) {
    return (
      <View key={sponsor} style={styles.sponsor}>
        {/* <Image style={styles.sponsorIcon} source={Images[sponsor.icon]} /> */}
        <Text style={styles.sponsorText}>{sponsor}</Text>
      </View>
    );
  }

  render() {
    const { onPress } = this.props;

    return (
      <Card onPress={onPress}>
        { this.renderContent() }
      </Card>
    );
  }
}
