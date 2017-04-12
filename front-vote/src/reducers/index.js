import { combineReducers } from 'redux';
import user from './LoginReducers';
import vote from './VoteReducers';
import didVote from './DidVoteReducers';

export default combineReducers({
  user,
  vote,
  didVote
});
