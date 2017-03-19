import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';

import './Vote.css';

class Vote extends Component{

  handleVoteCard(){
    browserHistory.push('/vote');
  }

  render(){
    return (
    <div>
      {this.props.params.vid}
    </div>
    );
  }
}

export default Vote;
