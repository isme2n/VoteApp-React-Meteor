import React, {Component} from 'react';
import { connect } from 'react-redux';
import {FlatButton, TextField} from 'material-ui';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import { callAddVote } from '../../actions/VoteAsyncActions';

class VoteInputDialog extends Component {
  constructor(props){
    super(props);
    const date = new Date();
    this.state = {
      start : date,
      end : date,
      ecnt : 3,
      elements:[{ value : "YES"},{ value : "NO"},{ value : "I DON'T CARE"}]
    }

    this.handleElementChange = this.handleElementChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addElement = this.addElement.bind(this);
    this.removeVote = this.removeElement.bind(this);
    this.handleAddVote = this.handleAddVote.bind(this);
  }

  handleAddVote(){
    this.props.dispatchCallAddVote({ title : this.state.voteTitle , start : this.state.start , end : this.state.end, host : this.props.user.username, elements: this.state.elements});
    this.props.handleOpen();
  };

  addElement(){
    this.setState({
      ecnt : this.state.ecnt+1
    })
  }

  removeElement(){
    this.setState({
      ecnt : this.state.ecnt-1
    })
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  handleElementChange(e){
    var elements = this.state.elements.slice();
    elements[e.target.name] = {value : e.target.value};
    this.setState({ elements: elements })
  }

  handleStartChange = (event,date) => {
    // var time = date.getFullYear() + '.' + (date.getMonth()+1) + '.' + date.getDate();
    this.setState({
      start : date,
      minDate : date,
      end : date
    });
  }

  handleEndChange = (event,date) => {
    this.setState({
      end : date
    });
  }

  render(){
    const children = [];
    for(var i=0; i < this.state.ecnt; i++) {
      children.push(<TextField type="text" name={""+i} key={i} placeholder={"element"+i} onChange={this.handleElementChange}/>);
      children.push(<br key={'br'+i}/>);
    };
    const actions = [
      <FlatButton
        label="Cancle"
        primary={true}
        onTouchTap={this.props.handleOpen}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleAddVote}
      />
    ];
    return(
      <Dialog
      title="Add Vote Dialog"
      actions={actions}
      modal={false}
      open={this.props.open}
      onRequestClose={this.props.handleOpen}
      autoScrollBodyContent={true}
      >
        <div className="titleBox">
          <p>Title : </p>
          <TextField type="text" name="voteTitle" placeholder="vote title" onChange={this.handleChange}></TextField>
        </div>
        <div className="dateBox">
          <p>Date : </p>
          <DatePicker name="start" hintText="start date" minDate={new Date()} value={this.state.start} onChange={this.handleStartChange}/>
          <DatePicker name="end" hintText="end date" minDate={this.state.minDate} value={this.state.end} onChange={this.handleEndChange}/>
        </div>
        <div className="elementBox">
          <p>Elements : </p>
          {children}
          <br/>
          <FlatButton onClick={this.addElement}>add</FlatButton>
          <FlatButton onClick={this.removeElement}>remove</FlatButton>
        </div>
      </Dialog>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  vote : state.vote
});
const mapDispatchToProps = dispatch => ({
  dispatchCallAddVote : data => dispatch(callAddVote(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VoteInputDialog);
