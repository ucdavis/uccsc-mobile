import React from 'react';
import { View, Text } from 'react-native';
import Sponsor from './Sponsor';
import { Images } from '../Themes';
import styles from './Styles/SponsorsStyle';

const data = require('../Fixtures/sponsors.json');

const Sponsors = () => {
  return (
    <View style={styles.sponsors}>
      <Text style={styles.heading}>Our Sponsors</Text>
      <Text style={styles.description}>
        Thank you to our generous sponsors for helping to make UCCSC possible. We couldn't have done it without you!
      </Text>

      <Text style={styles.sponsorTierTitle}>
        Platinum Sponsors
      </Text>
      <View style={styles.sponsorTier}>
        { data.platinum.map(s =>
          <Sponsor key={s.name} url={s.url} image={Images[s.image]} />
        ) }
      </View>

      <Text style={styles.sponsorTierTitle}>
        Gold Sponsors
      </Text>
      <View style={styles.sponsorTier}>
        { data.gold.map(s =>
          <Sponsor key={s.name} url={s.url} image={Images[s.image]} />
        ) }
      </View>

      <Text style={styles.sponsorTierTitle}>
        Silver Sponsors
      </Text>
      <View style={styles.sponsorTier}>
        { data.silver.map(s =>
          <Sponsor key={s.name} url={s.url} image={Images[s.image]} isLow />
        ) }
      </View>

      <Text style={styles.sponsorTierTitle}>
        Bronze Sponsors
      </Text>
      <View style={styles.sponsorTier}>
        { data.bronze.map(s =>
          <Sponsor key={s.name} url={s.url} image={Images[s.image]} isLow />
        ) }
      </View>

      <Text style={styles.sponsorTierTitle}>
        Additional Sponsors
      </Text>
      <View style={styles.sponsorTier}>
        <Sponsor url={'http://www.qlik.com/us/'} image={Images.qlikCoffee} />
      </View>
    </View>
  )
}

export default Sponsors;
