import {createStore, compose, applyMiddleware} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
// laod initial state

const defaultState = {};


const store = createStore(
  rootReducer,
  defaultState,
  applyMiddleware(thunk)
);

export const history = syncHistoryWithStore(browserHistory, store);
export default store;