import { AccessibilityInfo } from 'react-native';

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: false,
  // Dates of the conference
  conferenceDates: ['8/13/2018', '8/14/2018', '8/15/2018'],
  conferenceUrl: 'https://uccsc.ucdavis.edu',
  disableAnimations: AccessibilityInfo.fetch(),
};
