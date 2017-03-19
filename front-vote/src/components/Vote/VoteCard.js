import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';
import Vote from './Vote';

import './Vote.css';

class VoteCard extends Component{

  handleVoteCard(vid){
    browserHistory.push('/vote/'+vid);
  }

  render(){
    return (
      <Card className="voteCard" onClick={this.handleVoteCard.bind(this,this.props.vote._id)}>
        <CardTitle title={this.props.vote.title} subtitle={this.props.vote.host} />
        <p>Date:{this.props.vote.start} ~ {this.props.vote.end}</p>
        <p>{this.props.vote.finished ? 'Finished' : 'Proceeding'}</p>
      </Card>
    );
  }
}

export default VoteCard;
