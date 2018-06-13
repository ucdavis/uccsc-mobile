import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import DebugConfig from '../Config/DebugConfig';
import Config from '../Config/AppConfig';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  trackCurrentTime: null,
  startCurrentTime: null,
  updateCurrentTime: ['time'],
  lockCurrentTime: ['time'],
  unlockCurrentTime: null,
  setSelectedEvent: ['event'],
  clearSelectedEvent: null,
  updateSchedule: ['schedule'],
  updateActivities: ['activities'],
  updateTalks: ['talks'],
  starTalk: ['title'],
  unstarTalk: ['title'],
});

export const ScheduleTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
const initialTime = new Date();
if (DebugConfig.hotwireDate) {
  const firstDay = new Date(Config.conferenceDates[0]);
  initialTime.setFullYear(firstDay.getFullYear());
  initialTime.setMonth(firstDay.getMonth());
  initialTime.setDate(firstDay.getDate());
}

export const INITIAL_STATE = new Immutable({
  currentTime: initialTime,
  ignoreUpdates: false,
  selectedEvent: null,
  activities: require('../Fixtures/activities.json'),
  talks: require('../Fixtures/talks.json'),
  starredTalks: [],
});

/* ------------- Reducers ------------- */

export const updateCurrentTime = (state, { time }) => {
  return (state.ignoreUpdates) ? state : state.merge({ currentTime: time });
};

export const setSelectedEvent = (state, { event }) => {
  return state.merge({ selectedEvent: event });
};

export const clearSelectedEvent = (state) => {
  return state.merge({ selectedEvent: null });
};

// Used for Debugging
export const lockCurrentTime = (state, { time }) => {
  return state.merge({ currentTime: time, ignoreUpdates: true });
};

export const unlockCurrentTime = (state) => {
  return state.merge({ ignoreUpdates: false });
};

// Store API
// export const updateSchedule = (state, { schedule }) => {
//   const { activities, talks } = schedule;
//   return state.merge({ activities, talks });
// };

export const updateActivites = (state, { activities }) => state.merge({ activities });

export const updateTalks = (state, { talks }) => state.merge({ talks });

export const starTalk = (state = INITIAL_STATE, { title }) =>
  state.merge({ starredTalks: [...state.starredTalks, title] });

export const unstarTalk = (state = INITIAL_STATE, { title }) =>
  state.merge({ starredTalks: [...state.starredTalks.filter((t) => t !== title)] });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_CURRENT_TIME]: updateCurrentTime,
  [Types.LOCK_CURRENT_TIME]: lockCurrentTime,
  [Types.UNLOCK_CURRENT_TIME]: unlockCurrentTime,
  [Types.SET_SELECTED_EVENT]: setSelectedEvent,
  [Types.CLEAR_SELECTED_EVENT]: clearSelectedEvent,
  // [Types.UPDATE_SCHEDULE]: updateSchedule,
  [Types.UPDATE_ACTIVITIES]: updateActivites,
  [Types.UPDATE_TALKS]: updateTalks,
  [Types.STAR_TALK]: starTalk,
  [Types.UNSTAR_TALK]: unstarTalk,
});
