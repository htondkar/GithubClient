import React, {PropTypes} from 'react';
import GitHubClient from '../libs/GitHubClient.js'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SideMenu from './SideMenu.js';
import * as actions from '../actions/actionCreators.js';


class Main extends React.Component {
  render() {
    return (
      <div className="container" id="wrapper">
        <SideMenu />
        {React.cloneElement(this.props.children, Object.assign({}, GitHubClient, this.props))}
      </div>
    );
  }
}



function mapStateToProps(state) {
  return{
    isLoggedIn: state.isLoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
