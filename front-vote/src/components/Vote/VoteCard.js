import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { callRemoveVote } from '../../actions/VoteAsyncActions';
import Vote from './Vote';

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
    return (
      <Card className="voteCard" onClick={this.handleVoteCard.bind(this,this.props.index)}>
        <CardTitle title={this.props.vote.title} subtitle={this.props.vote.host}/>
        <p>{this.props.vote.start} ~ {this.props.vote.end}</p>
        <p>{this.props.vote.finished ? 'Finished' : 'Proceeding'}</p>
        <IconButton
        iconClassName="material-icons"
        tooltip="Delete This Vote"
        onClick={this.handleRemove}
        >
          cancel
        </IconButton>
      </Card>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  dispatchCallRemoveVote: _id => dispatch(callRemoveVote(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(VoteCard);
