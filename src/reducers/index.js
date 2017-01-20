import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; // to sync react router with redux store
import user from './user';
import search from './search';



const rootReducer = combineReducers({
  user,
  search,
  routing: routerReducer
});

export default rootReducer;
