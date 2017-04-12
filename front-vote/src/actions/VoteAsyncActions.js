import asteroid from '../common/asteroid';
import { addVote, getAllVote, removeVote, editVote, saveVote } from './VoteActions';

export function callAddVote(vote) {
  return dispatch => asteroid.call('addVote', vote)
      .then(result => dispatch(addVote({ _id: result, ...vote })));
}

export function callGetAllVote() {
  return dispatch => asteroid.call('getVotes')
      .then(result => dispatch(getAllVote(result)));
}

export function callRemoveVote(_id) {
  return dispatch => asteroid.call('removeVote', _id)
      .then(() => dispatch(removeVote(_id)));
}

export function callEditVote(_id, finished) {
  return dispatch => asteroid.call('editVote', _id, finished)
      .then(() => dispatch(editVote(_id, finished)));
}

export function callSaveVote(_id, value) {
  return dispatch => asteroid.call('saveVote', _id, value)
      .then(() => dispatch(saveVote(_id, value)));
}
