import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../Login/Login';
import asteroid from '../../common/asteroid';
import logo from './logo.svg';
import './Home.css';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';

import VoteCard from '../Vote/VoteCard'
import { callAddVote } from '../../actions/VoteAsyncActions';

var voteList;
class Home extends Component{
  constructor(props){
    super(props);

    this.state = {
      open: false,
      start : null,
      end : null
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleOpen(){
    this.setState({open: true});
  };

  handleClose(){
    this.setState({open: false});
  };

  handleAddVote(){
    this.props.dispatchCallAddVote({ title : this.state.voteTitle , start : this.state.start , end : this.state.end, host : this.props.user.username});
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

  handleStartChange = (event,date) => {
    var time = date.getFullYear() + '.' + (date.getMonth()+1) + '.' + date.getDate();
    this.setState({
      start : time
    });
  }

  handleEndChange = (event,date) => {
    this.setState({
      end : date.getFullYear() + '.' + (date.getMonth()+1) + '.' + date.getDate()
    });
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
                <VoteCard key={i} index={i} vote={v}/> ) : null}
          </div>
          <Dialog
          title="Add Vote Dialog"
          actions={actions}
          modal={false}
          minDate={new Date}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>Title : </p><input type="text" name="voteTitle" placeholder="vote title" onChange={this.handleChange}></input>
          <p>Date : </p><DatePicker name="start" hintText="start date" onChange={this.handleStartChange}/>
          <DatePicker name="end" hintText="end date" onChange={this.handleEndChange}/>
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
