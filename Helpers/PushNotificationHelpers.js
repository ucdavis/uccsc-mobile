import { format, addMinutes, addSeconds } from 'date-fns';
import { Platform } from 'react-native';
import DebugConfig from '../Config/DebugConfig';
import Config from '../Config/AppConfig';
import { hash } from '../Utils/String';

const fifteenMinutes = 15 * 60 * 1000;

const pushMessage = (title, start) => `${title} begins at ${format(start, 'h:mmA')}.`;

// Returns 15 minutes before talk time, unless in debug
const notificationTime = (talkTime) => {
  if (DebugConfig.hotwirePush) {
    return addSeconds(new Date(), 5);
  }

  // Pretending the day we open the app is day 1
  if (DebugConfig.hotwireDate) {
    const today = new Date();
    talkTime.setFullYear(today.getFullYear());
    talkTime.setMonth(today.getMonth());

    // Add days as needed
    const firstDay = new Date(Config.conferenceDates[0]);
    const dayDiff = talkTime.getDate() - firstDay.getDate();
    talkTime.setDate(today.getDate() + dayDiff);
  }
  return addMinutes(talkTime, -15);
};

export default {
  notificationTime,
  pushMessage,
};
