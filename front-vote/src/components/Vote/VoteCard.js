import React, {Component} from 'react';
import {Card, CardTitle} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { callRemoveVote } from '../../actions/VoteAsyncActions';
import { showDate } from '../../common/util';

import './Vote.css';

class VoteCard extends Component{
  constructor(props){
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }
  handleVoteCard(vid){
    browserHistory.push('/vote/'+vid);
  }

  handleRemove(e){
    this.props.dispatchCallRemoveVote(this.props.vote._id);
    e.stopPropagation();
  };


  render(){
    const isFinished = (new Date() > new Date(this.props.vote.end).setHours(24));
    return (
      <Card className={isFinished ? "archiveVote" : "voteCard"} style={isFinished ? {backgroundColor : '#fff', opacity : '0.4'} : {cusor : 'pointer'}} onClick={isFinished ? null : this.handleVoteCard.bind(this,this.props.index)} >
        <CardTitle title={this.props.vote.title} subtitle={this.props.vote.host}/>
        <p>{showDate(this.props.vote.start)} ~ {showDate(this.props.vote.end)}</p>
        <p>{ isFinished ? 'Finished' :'Proceeding'}</p>
        { (this.props.host === this.props.vote.host) ?
          <IconButton
          iconClassName="material-icons"
          tooltip="Delete This Vote"
          onClick={this.handleRemove}
          >
            cancel
          </IconButton>
          :
          null
        }
      </Card>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  dispatchCallRemoveVote: _id => dispatch(callRemoveVote(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(VoteCard);
