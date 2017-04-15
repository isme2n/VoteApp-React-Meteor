import { SAVE_VOTE, GET_DID_VOTE } from '../actions/VoteActions';
import { save } from '../common/helpers';

const DidVoteReducers = (state = [], action) => {
  switch (action.type) {
    case SAVE_VOTE:
      return save(state, action);
    case GET_DID_VOTE:
      return action.data;
    default:
      return state;
  }
};

export default DidVoteReducers;
