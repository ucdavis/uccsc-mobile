import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Initial State ------------- */
export const INITIAL_STATE = new Immutable({
  notifications: [
    { message: 'This is my new message' },
  ],
  localNotifications: [],
});

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addNotification: ['message'],
  clearNotifications: null,
  trackLocalNotification: ['id', 'title'],
  untrackLocalNotification: ['id'],
});

export const NotificationTypes = Types;
export default Creators;

/* ------------- Reducer ------------- */

export const addNotification = (state = INITIAL_STATE, { message }) => 
  Immutable.merge(state, { notifications: [...state.notifications, message] });

export const clearAllNotifications = (state ) =>
  Immutable.merge(state, { notifications: [] });

export const trackLocalNotification = (state = INITIAL_STATE, { id, title }) =>
  Immutable.merge(state, { localNotifications: [...state.localNotifications, { id, title }] });

export const untrackLocalNotification = (state, { id }) =>
  Immutable.merge(state, { localNotifications: [...state.localNotifications.filter((n) => n.id !== id)] });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_NOTIFICATION]: addNotification,
  [Types.CLEAR_NOTIFICATIONS]: clearAllNotifications,
  [Types.TRACK_LOCAL_NOTIFICATION]: trackLocalNotification,
  [Types.UNTRACK_LOCAL_NOTIFICATION]: untrackLocalNotification,
});
