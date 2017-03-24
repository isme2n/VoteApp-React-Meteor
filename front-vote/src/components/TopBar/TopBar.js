
import React, { Component } from 'react';
import {AppBar, FlatButton, Paper ,FontIcon, Drawer} from 'material-ui';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import './TopBar.css';
import Logged from './Logged'
import asteroid from '../../common/asteroid';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

class TopBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logged: this.props.logged,
      isLeftDrawerOpened: false
    };
    this.handleMenu = this.handleMenu.bind(this);
  }

  toggleLeftDrawer() {
    this.setState({ isLeftDrawerOpened: !this.state.isLeftDrawerOpened });
  }

  handleLogout(){
    asteroid.logout();
  }

  handleMenu(){
    this.setState({ isLeftDrawerOpened: !this.state.isLeftDrawerOpened });
    browserHistory.push('/');
  }

  render() {
    return (
      <Paper className="top-bar">
        <AppBar
          title="VoteApp"
          style={{backgroundColor:'#000'}}
          onLeftIconButtonTouchTap={() => this.toggleLeftDrawer()}
          iconElementRight={this.state.logged ? <Logged /> : <FlatButton {...this.props} label="Login" />}
        />
        <Drawer
          open={this.state.isLeftDrawerOpened}
          docked={false}
          onRequestChange={() => this.toggleLeftDrawer()}
        >
          <List>
            <ListItem
              disabled
              leftAvatar={
                <Avatar icon={<FontIcon className="material-icons">face</FontIcon>} />
              }
              primaryText={this.props.user ? this.props.user.username : null}
              secondaryText="your-email@mail.com"
            />
            <Divider />

            <ListItem
              primaryText="Home"
              onClick={this.handleMenu}
              leftIcon={<FontIcon className="material-icons">home</FontIcon>}
            />
            <ListItem
              primaryText="Logout"
              onClick={this.handleLogout}
              leftIcon={<FontIcon className="material-icons">remove_circle_outline</FontIcon>}
            />
          </List>
        </Drawer>
      </Paper>
    );
  }
}

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  user : state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
