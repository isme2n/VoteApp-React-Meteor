import React, {Component} from 'react';
import TopBar from '../TopBar';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import './Main.css';


class Main extends Component{
  render(){
    return (
      <div>
        <section className="section">
          <TopBar logged={true}/>
            <div className="container" >
              {this.props.children}
            </div>
        </section>
        <Alert className="alert" position="top-right" effect="jelly"/>
      </div>
    );
  }
}

Main.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default Main;
