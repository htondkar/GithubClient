import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import store, {history} from './store';
import LogIn from './components/LogIn.js';
import Dashboard from './components/Dashboard.js';
import SearchResults from './components/SearchResults.js';
import bootstrap from 'bootstrap';
import jQuery from 'jquery';
import './styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';


render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={LogIn} />
      <Route path='/dashboard/:userId' component={Dashboard} />
      <Route path='/search/:searchQuery' component={SearchResults} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
