import React, {PropTypes} from 'react';

export default class LogIn extends React.Component {
  constructor (props) {
    super();
    this.state = {

    }
    this.logInHandler = this.logInHandler.bind(this);
  }

  logInHandler(username, password) {
    this.props.action.logIn(username, password);
  }

  render() {
    return (
      <div className="login-form">
      <div className="card card-container">
          <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
          <p id="profile-name" className="profile-name-card"></p>
          <form className="form-signin" ref="form">
              <span id="reauth-email" className="reauth-email"></span>
              <input ref="username" type="text" id="inputEmail" className="form-control" placeholder="Github Username" required autoFocus/>
              <input ref="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
              {/* <div id="remember" className="checkbox">
                  <label>
                      <input type="checkbox" value="remember-me" />
                      Remember me
                  </label>
              </div> */}
              <button onClick={()=>this.logInHandler()}className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
          </form>
          {/* <a href="#" className="forgot-password">
              Forgot the password?
          </a> */}
      </div>
  </div>
    );
  }
}
