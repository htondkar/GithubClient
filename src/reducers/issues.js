import * as actionsTypes from '../actions/actionTypes'

export default function issues(state = {}, action) {
    switch (action.type) {
      case actionsTypes.FETCH_ISSUES_LIST_SUCCESS:
        return {
          ...state,
          [action.repoFullName.toString()]: action.issuesList
        };
        break;

      default:
        return state;
    }
}
