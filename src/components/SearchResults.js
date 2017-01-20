import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SideMenu from './SideMenu.js';
import SearchResultRow from './SearchResultRow.js';
import * as actions from '../actions/actionCreators.js';
import {browserHistory} from 'react-router';


class SearchResults extends React.Component {

  render() {
    let results = this.props.searchResults || []
    return (
      <div className="dashboard-wrapper">
        <SideMenu username={this.props.username} search={this.props.actions.search}/>
        <div className="dashboard">
          search results:
          <hr/>
          <ol>
            {results.map((result, i)=><SearchResultRow key={i} result={result} />)}
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
    username: state.user.username
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
