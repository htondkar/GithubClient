
import * as actionTypes from './actionTypes';
import GitHubClient from '../libs/GitHubClient.js'
import {token} from '../gitConfig.js';

let githubCliEnterprise = new GitHubClient({
  baseUri: "https://api.github.com",
  token: token
});

function beginAjaxCall(task) {
  return {
    type: actionTypes.AJAX_CALL_IN_PROGRESS,
    task: task
  };
}

//Log in action creator
function successfulLogIn(userData) {
  console.log(userData);
  return {
    type: actionTypes.LOG_IN_SUCCESS,
    userData
  };
}

//Log in - redux thunk
export function logIn(username, password) {
  return function (dispatch) {
    dispatch(beginAjaxCall('LOG_IN'));
    return (
      githubCliEnterprise.getData({path: `/users/${username}`})
      .then( response => { dispatch(successfulLogIn(response.data)) } )
      .catch(err=> {throw err})
    );
  };
};
