import {createStore, applyMiddleware, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
// laod initial state

const defaultState = {
  forks: [],
  issues: [],
  user: {},
  search: {},
  watch: []
};


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(thunk))
);

export const history = syncHistoryWithStore(browserHistory, store);
export default store;
