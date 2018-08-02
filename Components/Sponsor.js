import React from 'react';
import {
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import styles from './Styles/SponsorsStyle';

const Sponsor = (props) => {
  return (
    <TouchableOpacity
      style={styles.sponsor}
      onPress={() => Linking.openURL(props.url)}
    >
      <Image style={styles.imageStyle} source={props.image} resizeMode="center" />
    </TouchableOpacity>
  );
};

export default Sponsor;
