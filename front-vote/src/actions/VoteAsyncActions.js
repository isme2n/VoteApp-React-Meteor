import asteroid from '../common/asteroid';
import { addVote, getAllVote, removeVote, editVote } from './VoteActions';

export function callAddVote(message) {
  return dispatch => asteroid.call('addVote', message)
      .then(result => dispatch(addVote({ _id: result, ...message })));
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
