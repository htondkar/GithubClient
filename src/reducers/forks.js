import * as actionsTypes from '../actions/actionTypes'

export default function forks(state = {}, action) {
    switch (action.type) {
      case actionsTypes.FETCH_FORKS_LIST_SUCCESS:
        return {
          ...state,
          [action.repoFullName.toString()]: action.forksList
        };
        break;

      default:
        return state;
    }
}
