import actionsTypes from '../actions/actionTypes'

export default function authentication(state = [], action) {
    switch (action.type) {
      case actionsTypes.AJAX_CALL_IN_PROGRESS:
        return state
        break;
      default:

    }
}
