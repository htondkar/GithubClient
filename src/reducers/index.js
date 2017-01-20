import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; // to sync react router with redux store
import authentication from './authentication';



const rootReducer = combineReducers({
  authentication,
  routing: routerReducer
});

export default rootReducer;
