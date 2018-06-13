import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import DebugConfig from '../Config/DebugConfig';
import Config from '../Config/AppConfig';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateNews: ['news'],
});

export const NewsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = new Immutable({
  news: require('../Fixtures/news.json'),
});

/* ------------- Reducers ------------- */

export const updateNews = (state = INITIAL_STATE, { news }) => Immutable.merge(state, { news });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_NEWS]: updateNews,
});
