import * as actionsTypes from '../actions/actionTypes'

export default function watch(state = [], action) {
    switch (action.type) {

      case actionsTypes.WATCH_REPO_SUCCESS:
        return [
          ...state,
          action.repoFullName
        ];
        break;

      default:
        return state;
    }
}
