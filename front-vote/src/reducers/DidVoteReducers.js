import { SAVE_VOTE } from '../actions/VoteActions';
import { save } from '../common/helpers';

const DidVoteReducers = (state = [], action) => {
  switch (action.type) {
    case SAVE_VOTE:
      return save(state, action);
    default:
      return state;
  }
};

export default DidVoteReducers;
