/*
 * action types
 */

export const ADD_VOTE = 'ADD_VOTE';
export const REMOVE_VOTE = 'REMOVE_VOTE';
export const EDIT_VOTE = 'EDIT_VOTE';
export const GET_ALL_VOTE = 'GET_ALL_VOTE';

/*
 * action creators
 */

export function insertVote(data) {
  return {
    type: ADD_VOTE,
    data,
  };
}

export function removeVote(_id) {
  return {
    type: REMOVE_VOTE,
    _id,
  };
}

export function editVote(_id, finished) {
  return {
    type: EDIT_VOTE,
    _id,
    finished,
  };
}

export function getAllVote(data) {
  return {
    type: GET_ALL_VOTE,
    data,
  };
}
