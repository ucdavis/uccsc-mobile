import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { isSameDay, isBefore } from 'date-fns';

import { GroupBy } from '../Utils/Array';

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
  updateSchedule: ['activities', 'talks'],
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

const initialActivities = require('../Fixtures/activities.json');
const initialTalks = require('../Fixtures/talks.json');
const initialSchedule = [
  buildScheduleList(initialActivities, initialTalks, 0),
  buildScheduleList(initialActivities, initialTalks, 1),
  buildScheduleList(initialActivities, initialTalks, 2),
];

export const INITIAL_STATE = new Immutable({
  currentTime: initialTime,
  ignoreUpdates: false,
  selectedEvent: null,
  activities: initialActivities,
  talks: initialTalks,
  schedule: initialSchedule,
  starredTalks: [],
});

function buildScheduleList(activities, talks, dayIndex) {
  // fetch day
  const day = new Date(Config.conferenceDates[dayIndex]);

  // combine events
  let events = [
    ...activities,
    ...talks,
  ];

  // filter events
  events = events.filter(e => isSameDay(day, e.time));

  // group events by time slot
  let timeslots = GroupBy(events, e => e.time);

  // map the events, and sort the timeslot by title
  // use property data for sectionlists
  timeslots = timeslots.map(g => {
    const data = g.values;
    data.sort((a, b) => {
      // sort by type first
      if (a.eventType === 'Meal/Snack') {
        return -1;
      }
      if (b.eventType === 'Meal/Snack') {
        return 1;
      }

      if (a.eventType === 'Keynote') {
        return -1;
      }
      if (b.eventType === 'Keynote') {
        return 1;
      }

      if (a.eventType === 'Activity' && b.type === 'talk') {
        return -1;
      }
      if (b.eventType === 'Activity' && a.type === 'talk') {
        return 1;
      }

      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });

    return {
      time: g.key,
      data,
    };
  });

  // sort timeslots
  timeslots.sort((a, b) => {
    if (isBefore(new Date(a.time), new Date(b.time))) {
      return -1;
    }
    if (isBefore(new Date(b.time), new Date(a.time))) {
      return 1;
    }
    return 0;
  });

  return timeslots;
}

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

export const updateSchedule = (state, { activities, talks }) => {

  if (!activities) {
    activities = this.state.activities;
  }

  if (!talks) {
    talks = this.state.talks;
  }

  const schedule = [
    buildScheduleList(activities, talks, 0),
    buildScheduleList(activities, talks, 1),
    buildScheduleList(activities, talks, 2),
  ];

  return Immutable.merge(state, {
    activities,
    talks,
    schedule,
  });
};

export const starTalk = (state, { title }) =>
  Immutable.merge(state, { starredTalks: [...state.starredTalks, title] });

export const unstarTalk = (state, { title }) =>
  Immutable.merge(state, { starredTalks: [...state.starredTalks.filter((t) => t !== title)] });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_CURRENT_TIME]: updateCurrentTime,
  [Types.LOCK_CURRENT_TIME]: lockCurrentTime,
  [Types.UNLOCK_CURRENT_TIME]: unlockCurrentTime,
  [Types.SET_SELECTED_EVENT]: setSelectedEvent,
  [Types.CLEAR_SELECTED_EVENT]: clearSelectedEvent,
  [Types.UPDATE_SCHEDULE]: updateSchedule,
  [Types.STAR_TALK]: starTalk,
  [Types.UNSTAR_TALK]: unstarTalk,
});
