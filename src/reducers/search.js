import * as actionsTypes from '../actions/actionTypes'

export default function search(state = {}, action) {
    switch (action.type) {
      case actionsTypes.SEARCH_RESULT_SUCCESS:
        return {
          searchResults: action.results
        };
        break;

      default:
        return state;
    }
}
