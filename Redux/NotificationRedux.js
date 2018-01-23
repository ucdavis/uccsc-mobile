import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  notifications: ["This is my new message"],
})

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addNotification: ['message'],
  clearNotifications: null,
})

export const NotificationTypes = Types
export default Creators

/* ------------- Reducer ------------- */

export const addSingleNotification = (state = INITIAL_STATE, { message }) =>
  state.merge({ notifications: [...state.notifications, message] })

export const clearAllNotifications = (state) =>
  state.merge({notifications: []})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_NOTIFICATION]: addSingleNotification,
  [Types.CLEAR_NOTIFICATIONS]: clearAllNotifications,
})