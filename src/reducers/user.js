import * as actionTypes from '../actions/actionTypes'

export default function user(state = {}, action) {
    switch (action.type) {

      case actionTypes.LOG_IN_SUCCESS:
        return {
          logedIn: true,
          username: action.username,
          password: action.password,
          userRepos: action.userData
        };
        break;

      default:
        return state;
    }
}
