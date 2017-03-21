import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';

import './Vote.css';

class Vote extends Component{
  handleVoteCard(){
    browserHistory.push('/vote');
  }

  render(){
    const { vote } = this.props;
    const { vid } = this.props.params;
    return (
    <div>
      { vote.length > 0 ?
        <Card className="vote">
          <CardTitle title={vote[vid].title} subtitle={vote[vid].host}/>
          <CardText>
            {vote[vid].elements.map((e,i)=> <p>{e.value}</p>)}
          </CardText>
      </Card> : null}

    </div>
    );
  }
}
const mapStateToProps = state => ({
  vote : state.vote
});
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
