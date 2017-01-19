
import * as actionTypes from './actionTypes';


// getAllAuthors returns an array of objects. each author has an id, a first and a last name
// the action type is : LOAD_OF_AUTHORS_SUCCESS

//the action creator
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
