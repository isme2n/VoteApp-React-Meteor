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
      choose : null,
      did: false
    }

    this.changeChoose = this.changeChoose.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }


  componentDidUpdate(prevProps,prevState){
    if(prevProps !== this.props){
      for(var i = 0; i < this.props.didVote.length; i++) {
      if (this.props.didVote[i].vote_id === this.props.vote[this.props.params.vid]._id) {
        this.setState({
          did : true
        })
          break;
        }
      }
    }
  }

  componentDidMount(prevProps,prevState){
    if(prevProps !== this.props){
      for(var i = 0; i < this.props.didVote.length; i++) {
      if (this.props.didVote[i].vote_id === this.props.vote[this.props.params.vid]._id) {
        this.setState({
          did : true
        })
          break;
        }
      }
    }
  }

  componentWillUnmount(){
  }

  handleVote(){
    this.props.dispatchCallSaveVote({vote_id:this.props.vote[this.props.params.vid]._id, value:this.state.choose});

  }

  changeChoose(e){
    this.setState({
      choose : e.target.value
    })
  }

  render(){
    const { vote } = this.props;
    const { vid } = this.props.params;
    return (
    <div>
      { vote[vid] ?
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
                disabled={this.state.did}
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
  vote : state.vote,
  didVote : state.didVote
});
const mapDispatchToProps = dispatch => ({
    dispatchCallSaveVote : (data) => dispatch(callSaveVote(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
