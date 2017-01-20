import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SideMenu from './SideMenu.js';
import * as actions from '../actions/actionCreators.js';
import {browserHistory} from 'react-router';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <SideMenu />
        Dashboard
      </div>
    )
  }
}


//connect the component to redux store
function mapStateToProps(state) {
  return{
    ajaxCallInProgress: state.ajaxCalls,
    authentication: state.authentication
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
