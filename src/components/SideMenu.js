import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import logo from '../../public/gitlogo.png'

export default class SideMenu extends React.Component {

  handleSearch = (event) => {
    event.preventDefault();
    const username = this.props.username;
    const password = this.props.password;
    this.props.search(this.refs.search.value, username, password);
  }

  render() {
    return (
      <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
              <li className="sidebar-brand">
                <Link to={`/dashboard/${this.props.username}`}>
                  <img src={logo} alt="gitlogo" width="150px" />
                  <h2>Github Client</h2>
                </Link>
              </li>
              <li>
                <form id="search" onSubmit={this.handleSearch}>
                  <input ref="search" type="text" placeholder='search repositories' />
                </form>
              </li>
          </ul>
      </div>
    );
  }
}
