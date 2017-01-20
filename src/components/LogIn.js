import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import SideMenu from './SideMenu.js';
import * as actions from '../actions/actionCreators.js';


class LogIn extends React.Component {
  constructor (props) {
    super();
    this.state = {
      ajaxCallInProgress: false
    }
    this.logInHandler = this.logInHandler.bind(this);
  }

  logInHandler(event) {
    event.preventDefault();
    this.setState({ajaxCallInProgress: true})
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    this.props.actions.logIn(username, password);
    
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.ajaxCallInProgress) {
  //     $('#sign-in').toggleClass('active');
  //   }
  // }

  render() {
    return (
      <div className="login-form">
      <div className="card card-container">
          <img
            id="profile-img"
            className={"profile-img-card" + (this.state.ajaxCallInProgress ? ' active' : '') }
            alt="git logo"
            src="gitlogo.png" />
          <p id="profile-name" className="profile-name-card"></p>
          <form className="form-signin">
              <span id="reauth-email" className="reauth-email"></span>
              <input ref="username" type="text" id="inputEmail" className="form-control" placeholder="Github Username" required autoFocus/>
              <input ref="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
              {/* <div id="remember" className="checkbox">
                  <label>
                      <input type="checkbox" value="remember-me" />
                      Remember me
                  </label>
              </div> */}
              <button
                onClick = {this.logInHandler}
                className = {
                "btn btn-lg btn-primary btn-block btn-signin has-spinner"
                + (this.state.ajaxCallInProgress ? ' active' : '')}
                >
                 <span className="spinner"><i className="fa fa-refresh fa-spin"></i></span>
                Sign in
              </button>
          </form>
          {/* <a href="#" className="forgot-password">
              Forgot the password?
          </a> */}
      </div>
  </div>
    );
  }


}

//connect the component to redux store
function mapStateToProps(state) {
  return{
    userData: state.user.userData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
