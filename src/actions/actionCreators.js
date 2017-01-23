
import * as actionTypes from './actionTypes';
import GitHubClient from '../libs/GitHubClient.js'
import repositories from '../libs/features/repositories.js'
import users from '../libs/features/users.js'
import issues from '../libs/features/issues'
import {token} from '../gitConfig.js';
import {browserHistory} from 'react-router';

let github = new GitHubClient({
  baseUri: "https://api.github.com",
  token: token
}, repositories, users, issues);

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

function fetchRepoForksSuccess(forksList, repoFullName) {
  return {
    type: actionTypes.FETCH_FORKS_LIST_SUCCESS,
    forksList,
    repoFullName
  };
}

function fetchRepoIssuesSuccess(issuesList, repoFullName) {
  return {
    type: actionTypes.FETCH_ISSUES_LIST_SUCCESS,
    issuesList,
    repoFullName
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


//fetchRepoForks - redux thunk
export function fetchRepoForks(repoFullName) {
  return function (dispatch) {
    return (
      github.listForks({handle: repoFullName})
        .then(
        forksList => {
          dispatch(fetchRepoForksSuccess(forksList, repoFullName));
        }
      ).catch(err=> {throw err})
    );
  };
};

//fetchRepoIssues - redux thunk
export function fetchRepoIssues(repoFullName) {
  return function (dispatch) {
    return (
      github.fetchIssues({repoFullName})
        .then(
        issuesList => {
          dispatch(fetchRepoIssuesSuccess(issuesList, repoFullName));
        }
      ).catch(err=> {throw err})
    );
  };
};
