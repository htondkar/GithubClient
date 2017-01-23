import * as actionsTypes from '../actions/actionTypes'

export default function forks(state = {}, action) {
    switch (action.type) {

      case actionsTypes.FETCH_FORKS_LIST_SUCCESS:
        return {
          ...state,
          [action.repoFullName.toString()]: action.forksList
        };
        break;

      case actionsTypes.FORK_REPO_SUCCESS:
        const forked = state.forked || new Set();
        const repoFullName = action.response.full_name
        return {
          ...state,
          forkedRepos: forked.add(repoFullName.substr(repoFullName.indexOf("/") + 1))
        };
        break;

      default:
        return state;
    }
}
