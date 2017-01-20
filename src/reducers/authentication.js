import actionTypes from '../actions/actionTypes'

export default function authentication(state = {}, action) {
    switch (action.type) {
      case 'LOG_IN_SUCCESS':
        return {
          logedIn: true,
          username: action.userData.login
        };
        break;
      default:
        return state;
    }
}
