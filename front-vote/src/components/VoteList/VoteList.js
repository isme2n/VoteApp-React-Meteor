import React, {Component} from 'react';
import { connect } from 'react-redux';
import VoteCard from '../Vote/VoteCard';

class VoteList extends Component {
  render(){
    const { user, vote } = this.props;
    return(
      <div className="contents">
          {vote ? vote.map((v, i) =>
            <VoteCard key={i} index={i} vote={v} host={user.username}/> ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  vote : state.vote
});
const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(VoteList);
