import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SideMenu from './SideMenu.js';
import * as actions from '../actions/actionCreators.js';
import {browserHistory} from 'react-router';
import {token} from '../gitConfig.js';
import Repo from './Repo';



class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard-wrapper">
        <SideMenu username={this.props.username} search={this.props.actions.search}/>
        <div className="dashboard">
          <ol>
            {this.props.userRepos
              .map((repo)=><Repo
                key={repo.name}
                repo={repo}
                fetchRepoForks={this.props.actions.fetchRepoForks}
                fetchRepoIssues={this.props.actions.fetchRepoIssues}
                forksList={this.props.forksList}
                issuesList={this.props.issuesList}
              />
              )
            }
        </ol>
        </div>
      </div>
    )
  }
}


//connect the component to redux store
function mapStateToProps(state) {
  return {
    userRepos: state.user.userRepos,
    username: state.user.username,
    forksList: state.forks,
    issuesList: state.issues
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
