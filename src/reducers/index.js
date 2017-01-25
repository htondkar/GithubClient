import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; // to sync react router with redux store
import user from './user.js';
import search from './search.js';
import forks from './forks.js';
import issues from './issues.js';
import watch from './watch.js';



const rootReducer = combineReducers({
  user,
  search,
  forks,
  issues,
  watch,
  routing: routerReducer
});

export default rootReducer;
