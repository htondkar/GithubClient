
import * as actionTypes from './actionTypes';
import GitHubClient from '../libs/GitHubClient.js'
import repositories from '../libs/features/repositories.js'
import users from '../libs/features/users.js'
import {token} from '../gitConfig.js';
import {browserHistory} from 'react-router';

let github = new GitHubClient({
  baseUri: "https://api.github.com",
  token: token
}, repositories, users);

function beginAjaxCall(task) {
  return {
    type: actionTypes.AJAX_CALL_IN_PROGRESS,
    task: task
  };
}


function redirectToDashboard(username){
   browserHistory.push(`/dashboard/${username}`)
}

function redirectToSearchResults(query){
   browserHistory.push(`/search/${query}`)
}

//Log in action creator
function successfulLogIn(userData, username) {
  return {
    type: actionTypes.LOG_IN_SUCCESS,
    userData,
    username
  };
}

function searchSuccess(results) {
  return {
    type: actionTypes.SEARCH_RESULT_SUCCESS,
    results,
  };
}


//Log in - redux thunk
export function logIn(username, password) {
  return function (dispatch) {
    return (
        github.fetchUserRepositories({handle: username})
        .then(
        response => {
          dispatch(successfulLogIn(response, username));
          redirectToDashboard(username);
        }
      ).catch(err=> {throw err})
    );
  };
};

//Search - redux thunk
export function search(query) {
  return function (dispatch) {

    return (
      github.searchRepositories({handle: query})
        .then(
        response => {
          dispatch(searchSuccess(response.items));
          redirectToSearchResults(query);
        }
      ).catch(err=> {throw err})
    );
  };
};
