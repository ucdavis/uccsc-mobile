import React from 'react';
import {
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import styles from './Styles/SponsorsStyle';

class Sponsor extends React.Component {
  onPress = () => {
    const url = this.props.url;
    if (!url) {
      return;
    }

    const supported = Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.sponsor}
        onPress={this.onPress}
      >
        <Image style={styles.imageStyle} source={this.props.image} resizeMode="center" />
      </TouchableOpacity>
    );
  }
}

export default Sponsor;
