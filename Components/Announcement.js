import React from 'react';
import { Image, TouchableOpacity, View, Text, Linking, Button } from 'react-native';
import Config from '../Config/AppConfig';
import DebugConfig from '../Config/DebugConfig';
import { Images } from '../Themes';
import styles from './Styles/AnnouncementStyle';
import { format, isBefore, isAfter } from 'date-fns';

const correctProps = (props) => {
  const { conferenceDates } = Config;
  const { preEvent, eventDays, postEvent, currentDate } = props;
  const today = format(currentDate, 'M/D/YYYY');

  const index = conferenceDates.indexOf(today);
  if (index > -1) {
    return eventDays[index] || {};
  } else if (isBefore(today, conferenceDates[0])) {
    return preEvent || {};
  } else if (isAfter(today, conferenceDates[conferenceDates.length - 1])) {
    return postEvent || {};
  }

  return postEvent || {};
};

const LinkingButton = (props: ButtonProps) => {
  if (props.buttonUri && props.buttonText) {
    const { buttonUri, buttonText } = props;
    return (
      <Button
        onPress={() => Linking.openURL(buttonUri)}
        style={styles.partyButton}>
        <Text style={styles.partyButtonText}>
          {buttonText.toUpperCase()}
        </Text>
      </Button>

    );
  }

  return null;
};

const Announcement = (props) => {
  const { style, preEvent, postEvent } = props;
  if (!preEvent || !postEvent) return null;

  const {
    title,
    subtitle,
    eventTimeInfo,
    address,
    image,
    buttonUri,
    buttonText,
    headerLogo,
    headerImageHeight,
    headerImageWidth
  } = correctProps(props);

  if (!title) return null;

  return (
    <View>
      <Image source={image} style={style} />
      <View style={styles.afterPartyContainer}>
        <View style={styles.partyHeader}>
          <Image source={headerLogo} />
          <Text style={styles.welcomeParty}>
            {title.toUpperCase()}
          </Text>
          <Text style={styles.partyDescription}>
            {subtitle && subtitle.toUpperCase()}
          </Text>
        </View>
        <View style={styles.partyInfo}>
          <Text style={styles.partyDescription}>
            {eventTimeInfo && eventTimeInfo.toUpperCase()}
          </Text>
          <Text style={styles.partyDescription}>
            {address && address.toUpperCase()}
          </Text>
        </View>
      </View>
      <LinkingButton buttonUri={buttonUri} buttonText={buttonText} />
    </View>
  );
};

export default Announcement;
