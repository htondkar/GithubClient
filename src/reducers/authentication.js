import actionTypes from '../actions/actionTypes'

export default function authentication(state = [], action) {
    switch (action.type) {
      case 'LOG_IN':
        return state;
        break;
      default:
        return state;

    }
}
