import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import store, {history} from './store';
import Main from './components/Main.js';
import LogIn from './components/LogIn.js';
import Dashboard from './components/Dashboard.js';
import './styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';


render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Main}>
        <IndexRoute component={LogIn}/>
        <Route path='/dashboard/:userId' component={Dashboard} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
