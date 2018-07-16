import { format, addMinutes, addSeconds, setYear, setMonth, setDate } from 'date-fns';
import DebugConfig from '../Config/DebugConfig';

const pushMessage = (title, start) => `${title} begins at ${format(start, 'h:mmA')}.`;

// Returns 15 minutes before talk time, unless in debug
const notificationTime = (talkTime) => {

  if (DebugConfig.hotwirePush) {
    return addSeconds(new Date(), 5);
  }

  // offset timezone
  const today = new Date();
  // var offset = today.getTimezoneOffset();
  // talkTime = addMinutes(talkTime, offset);

  // set the reminder time for today
  if (DebugConfig.hotwireDate) {
    talkTime = setYear(talkTime, today.getFullYear()); 
    talkTime = setMonth(talkTime, today.getMonth());
    talkTime = setDate(talkTime, today.getDate());
  }
  
  return addMinutes(talkTime, -15);
};

export default {
  notificationTime,
  pushMessage,
};
