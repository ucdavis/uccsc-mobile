import React from 'react';
import * as ReactNavigation from 'react-navigation';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import AppNavigation from '../Navigation/AppNavigation';

const INITIAL_STATE = AppNavigation.router.getStateForAction(AppNavigation.router.getActionForPathAndParams('Schedule'));

export const reducer = (state = INITIAL_STATE, action) => {
  const nextState = AppNavigation.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

export const addListener = createReduxBoundAddListener('root');

export default ReactNavigation.NavigationActions;
