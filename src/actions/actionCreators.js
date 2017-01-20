
import * as actionTypes from './actionTypes';
import GitHubClient from '../libs/GitHubClient.js'


let githubCliEnterprise = new GitHubClient({
  baseUri: "http://github.at.home/api/v3",
  token: process.env.TOKEN_GHITHUB_ENTERPRISE
});


//Log in
export function logIn(username, password) {

  return {type: actionTypes.LOG_IN_BEGIN};
}


// export function loadAllAuthors() {
//   return function (dispatch) {
//     dispatch(beginAjaxCall());
//     return (
//       {
//         type: actionTypes.AJAX_CALL_IN_PROGRESS
//       }
//       ).catch(err=> {
//         throw err;
//       })
//     );
//   };
//
// }
