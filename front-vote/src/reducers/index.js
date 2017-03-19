import { combineReducers } from 'redux';
import user from './LoginReducers';
import vote from './VoteReducers';

export default combineReducers({
  user,
  vote
});
