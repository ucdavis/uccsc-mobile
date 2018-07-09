import React from 'react';
import {
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import styles from './Styles/SponsorsStyle';

const Sponsor = (props) => {
  const imageStyle = props.isLow ? styles.lowTier : {};

  return (
    <TouchableOpacity
      style={styles.sponsor}
      onPress={() => Linking.openURL(props.url)}
    >
      <Image style={imageStyle} source={props.image} resizeMode="center" />
    </TouchableOpacity>
  )
}

export default Sponsor;
