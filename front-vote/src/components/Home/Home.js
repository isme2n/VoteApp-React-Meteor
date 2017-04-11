import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../Login/Login';
import asteroid from '../../common/asteroid';
import './Home.css';
import RaisedButton from 'material-ui/RaisedButton';

import VoteList from '../VoteList/VoteList';
import VoteInputDialog from '../VoteInputDialog/VoteInputDialog';

class Home extends Component{
  constructor(props){
    super(props);

    this.state={
      open : false
    }

    this.handleOpen = this.handleOpen.bind(this);
  }

  handleLogout(){
    asteroid.logout();
  };

  handleOpen(){
    this.setState({open: !this.state.open});
  };


  render() {
    const { user } = this.props;
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
          <div className="Vote-list">
            <h1 className="Home-intro">
              Vote List
            </h1>
            <RaisedButton label="Add Vote" onTouchTap={this.handleOpen} />
            <VoteList></VoteList>
          </div>
          <VoteInputDialog open={this.state.open} handleOpen={this.handleOpen}/>
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

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
