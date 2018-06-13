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

export const updateCurrentTime = (state, { time }) =>
  (state.ignoreUpdates) ? state : Immutable.merge(state, { currentTime: time });

export const setSelectedEvent = (state, { event }) =>
  Immutable.merge(state, { selectedEvent: event });

export const clearSelectedEvent = (state) =>
  Immutable.merge(state, { selectedEvent: null });

// Used for Debugging
export const lockCurrentTime = (state, { time }) =>
  Immutable.merge(state, { currentTime: time, ignoreUpdates: true });

export const unlockCurrentTime = (state) =>
  Immutable.merge(state, { ignoreUpdates: false });

export const updateActivites = (state, { activities }) =>
  Immutable.merge(state, { activities });

export const updateTalks = (state, { talks }) =>
  Immutable.merge(state, { talks });

export const starTalk = (state = INITIAL_STATE, { title }) =>
  Immutable.merge(state, { starredTalks: [...state.starredTalks, title] });

export const unstarTalk = (state = INITIAL_STATE, { title }) =>
  Immutable.merge(state, { starredTalks: [...state.starredTalks.filter((t) => t !== title)] });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_CURRENT_TIME]: updateCurrentTime,
  [Types.LOCK_CURRENT_TIME]: lockCurrentTime,
  [Types.UNLOCK_CURRENT_TIME]: unlockCurrentTime,
  [Types.SET_SELECTED_EVENT]: setSelectedEvent,
  [Types.CLEAR_SELECTED_EVENT]: clearSelectedEvent,
  [Types.UPDATE_ACTIVITIES]: updateActivites,
  [Types.UPDATE_TALKS]: updateTalks,
  [Types.STAR_TALK]: starTalk,
  [Types.UNSTAR_TALK]: unstarTalk,
});
