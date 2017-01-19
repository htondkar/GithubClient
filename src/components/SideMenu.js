import React, {PropTypes} from 'react';
import {Link} from 'react-router';


export default class SideMenu extends React.Component {
  render() {
    return (
      <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
              <li className="sidebar-brand">
                <Link to="/">
                  <img src="gitlogo.png" alt="gitlogo"/>
                  <h2>Github Client</h2>
                </Link>
              </li>
          </ul>
      </div>
    );
  }
}
