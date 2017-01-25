import * as actionsTypes from '../actions/actionTypes'

export default function issues(state = {}, action) {
    switch (action.type) {
      case actionsTypes.FETCH_ISSUES_LIST_SUCCESS:
        return {
          ...state,
          [action.repoFullName.toString()]: action.issuesList
        };
        break;

      // case actionsTypes.CREATE_ISSUE_SUCCESS:
      //   const issuesList = state.issuesList || [];
      //   return {
      //     ...state,
      //     issuesList: issuesList.push({[action.repoFullName]: action.issueNumber })
      //   };
      //   break;

      default:
        return state;
    }
}
