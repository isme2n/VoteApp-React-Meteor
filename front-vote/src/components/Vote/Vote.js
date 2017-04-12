import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { callSaveVote } from '../../actions/VoteAsyncActions';
import { showDate } from '../../common/util';

import './Vote.css';

const styles = {
  hr: {
    margin : 32
  },
  hr2: {
    margin : 30
  },
  radioButton: {
    marginBottom: 16,
  },
};

class Vote extends Component{
  constructor(props){
    super(props);

    this.state = {
      choose : null
    }

    this.changeChoose = this.changeChoose.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  handleVote(){
    this.props.dispatchCallSaveVote(this.props.vote[this.props.params.vid]._id, this.state.choose);

  }

  changeChoose(e){
    console.log(e.target.value);
    this.setState({
      choose : e.target.value
    })
  }

  render(){
    const { vote } = this.props;
    const { vid } = this.props.params;
    return (
    <div>
      { vote.length > 0 ?
        <Card className="vote">
          <CardTitle title={vote[vid].title} subtitle={vote[vid].host}/>
          <p>{showDate(vote[vid].start)} ~ {showDate(vote[vid].end)}</p>
          <hr style={styles.hr}/>
          <CardText>
            <RadioButtonGroup
              name="elements"
              onChange={this.changeChoose} >
              {vote[vid].elements.map((e,i)=>
                <RadioButton
                key={i}
                value={e.value}
                label={e.value}
                style={styles.radioButton}
                />
              )}
            </RadioButtonGroup>
            <hr style={styles.hr2}/>
            <RaisedButton onClick={this.handleVote}> VOTE </RaisedButton>
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
    dispatchCallSaveVote : (_id,data) => dispatch(callSaveVote(_id,data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
