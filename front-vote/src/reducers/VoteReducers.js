import { ADD_VOTE, REMOVE_VOTE, EDIT_VOTE, GET_ALL_VOTE } from '../actions/VoteActions';
import { remove, edit, add } from '../common/helpers';

const VoteReducers = (state = [], action) => {
  switch (action.type) {
    case ADD_VOTE:
      return add(state, action);
    case REMOVE_VOTE:
      return remove(state, action);
    case EDIT_VOTE:
      return edit(state, action);
    case GET_ALL_VOTE:
      return action.data;
    default:
      return state;
  }
};

export default VoteReducers;
