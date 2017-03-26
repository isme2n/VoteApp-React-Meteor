import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../Login/Login';
import asteroid from '../../common/asteroid';
import './Home.css';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

import VoteCard from '../Vote/VoteCard'
import { callAddVote } from '../../actions/VoteAsyncActions';

class Home extends Component{
  constructor(props){
    super(props);

    this.state = {
      open: false,
      start : new Date(),
      end : null,
      ecnt : 3,
      elements:[{ value : "YES"},{ value : "NO"},{ value : "I DON'T CARE"}]
    }

    this.handleElementChange = this.handleElementChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleOpen(){
    this.setState({
      open: true,
      ecnt : 3
    });
  };

  handleClose(){
    this.setState({open: false});
  };

  handleAddVote(){
    this.props.dispatchCallAddVote({ title : this.state.voteTitle , start : this.state.start , end : this.state.end, host : this.props.user.username, elements: this.state.elements});
    this.handleClose();
  };

  handleLogout(){
    asteroid.logout();
  };

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
    var time = date.getFullYear() + '.' + (date.getMonth()+1) + '.' + date.getDate();
    this.setState({
      start : time,
      minDate : date
    });
  }

  handleEndChange = (event,date) => {
    this.setState({
      end : date.getFullYear() + '.' + (date.getMonth()+1) + '.' + date.getDate()
    });
  }

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

  render() {
    const { user, vote } = this.props;
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleAddVote.bind(this)}
      />,
      <FlatButton
        label="Cancle"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />
    ];

    if (user && user.username) {
      const children = [];
      for(var i=0; i < this.state.ecnt; i++) {
        children.push(<TextField type="text" name={""+i} key={i} placeholder={"element"+i} onChange={this.handleElementChange}/>);
      };
      return (
        <div className="Home">
          <div className="Home-header">
              <h2>Welcome to VoteApp</h2>
              <div className="logout">
                {user.username}
                <RaisedButton onClick={this.handleLogout} className="logout-button">Logout</RaisedButton>
              </div>
          </div>
          <h1 className="Home-intro">
            Vote List
          </h1>
          <div>
            <RaisedButton label="Add Vote" onTouchTap={this.handleOpen.bind(this)} />
          </div>
          <div className="contents">
              {vote ? vote.map((v, i) =>
                <VoteCard key={i} index={i} vote={v} host={user.username}/> ) : null}
          </div>
          <Dialog
          title="Add Vote Dialog"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          >
            <div className="titleBox">
              <p>Title : </p>
              <TextField type="text" name="voteTitle" placeholder="vote title" onChange={this.handleChange}></TextField>
            </div>
            <div className="dateBox">
              <p>Date : </p>
              <DatePicker name="start" hintText="start date" minDate={new Date()} onChange={this.handleStartChange}/>
              <DatePicker name="end" hintText="end date" minDate={this.state.minDate} onChange={this.handleEndChange}/>
            </div>
            <div className="elementBox">
              <p>Elements : </p>
              {children}
              <br/>
              <FlatButton onClick={this.addElement.bind(this)}>add</FlatButton>
              <FlatButton onClick={this.removeElement.bind(this)}>remove</FlatButton>
            </div>
          </Dialog>
        </div>
      );
    }
    return <Login />;
  };
}

Home.propTypes = {
  user: React.PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user,
  vote : state.vote
});
const mapDispatchToProps = dispatch => ({
  dispatchCallAddVote : data => dispatch(callAddVote(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
