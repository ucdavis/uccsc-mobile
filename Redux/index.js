import { combineReducers } from 'redux';
import configureStore from './CreateStore';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    announcements: require('./AnnouncementsRedux').reducer,
    schedule: require('./ScheduleRedux').reducer,
    notifications: require('./NotificationRedux').reducer,
  });

  return configureStore(rootReducer);
};
