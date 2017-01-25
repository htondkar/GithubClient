import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SideMenu from './SideMenu.js';
import Repo from './Repo.js';
import * as actions from '../actions/actionCreators.js';
import {browserHistory} from 'react-router';
var beautify = require("json-format");

class SearchResults extends React.Component {

  render() {
    let results = this.props.searchResults || []
    return (
      <div className="dashboard-wrapper">
        <SideMenu username={this.props.username} search={this.props.actions.search}/>
        <div className="dashboard">
          <ol className="list-group">
            {results.map((repo)=><Repo
              key={repo.full_name}
              repo={repo}
              fetchRepoForks={this.props.actions.fetchRepoForks}
              fetchRepoIssues={this.props.actions.fetchRepoIssues}
              forksList={this.props.forksList}
              issuesList={this.props.issuesList}
              forkRepo={this.props.actions.forkRepo}
              forkedRepos={this.props.forkedRepos}
              watchRepo={this.props.actions.watchRepo}
              watchedRepos={this.props.watchedRepos}
              createIssue={this.props.actions.createIssue}
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
    searchResults: state.search.searchResults,
    username: state.user.username,
    forksList: state.forks,
    issuesList: state.issues,
    forkedRepos: state.forks.forkedRepos,
    watchedRepos: state.watch,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
