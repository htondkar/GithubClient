
import * as actionTypes from './actionTypes';
import GitHubClient from '../libs/GitHubClient.js'
import repositories from '../libs/features/repositories.js'
import users from '../libs/features/users.js'
import issues from '../libs/features/issues'
// import {token} from '../gitConfig.js';
import {browserHistory} from 'react-router';
import toastr from 'toastr';


function client(username, password, ContentType = undefined) {
  return new GitHubClient({
    baseUri: "https://api.github.com",
    username: username,
    password:password,
    ContentType: undefined
  }, repositories, users, issues);
}

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
function successfulLogIn(userData, username, password) {
  return {
    type: actionTypes.LOG_IN_SUCCESS,
    userData,
    username,
    password
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

function forkRepoSuccess(response) {
  return {
    type: actionTypes.FORK_REPO_SUCCESS,
    response,
  };
}

function watchRepoSuccess(repoFullName) {
  return {
    type: actionTypes.WATCH_REPO_SUCCESS,
    repoFullName,
  };
}

// function createIssueSuccess(repoFullName, issueNumber) {
//   return {
//     type: actionTypes.CREATE_ISSUE_SUCCESS,
//     repoFullName,
//     issueNumber
//   };
// }

//Log in - redux thunk
export function logIn(username, password) {
  return function (dispatch) {
    const github = client(username, password);
    return (
        github.fetchUserRepositories({handle: username})
        .then(
        response => {
          dispatch(successfulLogIn(response, username, password));
          redirectToDashboard(username);
        }
      ).catch(err=> {throw err})
    );
  };
};

//Search - redux thunk
export function search(query, username, password) {
  return function (dispatch) {
    const github = client(username, password);
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
export function fetchRepoForks(repoFullName, username, password) {
  return function (dispatch) {
    const github = client(username, password);
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
export function fetchRepoIssues(repoFullName, username, password) {
  return function (dispatch) {
    const github = client(username, password);
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

//forkRepo - redux thunk
export function forkRepo(repoFullName, username, password) {
  return function (dispatch) {
    const github = client(username, password);
    return (
      github.forkRepo({repoFullName})
        .then(response => {
          dispatch(forkRepoSuccess(response));
        }
      ).catch(err=> {throw err})
    );
  };
};

//create an issue for a Repo - redux thunk
export function createIssue(title, body, repoFullName, username, password) {
  return function (dispatch) {
    const github = client(username, password);
    return (
      github.createIssue({title, body, repoFullName})
        .then((response) => {
          toastr.success(
            `you successfuly created an issue for ${repoFullName}
            | issue number: ${response.number}`)
        }
      ).catch(err=> {throw err})
    );
  };
};

//watch a repo (LEGACY) - redux thunk
export function watchRepo(repoFullName, username, password) {
  return function (dispatch) {
    const github = client(username, password, 0);
    return (
      github.watchRepo({repoFullName})
        .then(() => {
          dispatch(watchRepoSuccess(repoFullName));
        }
      ).catch(err=> {throw err})
    );
  };
};
