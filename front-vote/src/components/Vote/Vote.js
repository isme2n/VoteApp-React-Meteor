import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import './Vote.css';

const styles = {
  hr: {
    margin : 32
  },
  radioButton: {
    marginBottom: 16,
  },
};

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
          <p>{vote[vid].start} ~ {vote[vid].end}</p>
          <hr style={styles.hr}/>
          <CardText>
            <RadioButtonGroup name="elements" >
              {vote[vid].elements.map((e,i)=>
                <RadioButton
                key={i}
                value={e.value}
                label={e.value}
                style={styles.radioButton}
                />
              )}
            </RadioButtonGroup>
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
