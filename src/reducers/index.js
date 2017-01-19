import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; // to sync react router with redux store
import authentication from './authentication';
import ajaxCalls from './ajaxCalls';


const rootReducer = combineReducers({
  authentication,
  routing: routerReducer
});

export default rootReducer;
