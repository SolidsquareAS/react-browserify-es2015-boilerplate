import React from 'react';
import { render } from 'react-dom';
import HomePage from '../../private/js/components/HomePage';

import { Router, Route, browserHistory } from 'react-router';

render((
  <Router history={browserHistory}>
    <Route path="/" component={HomePage}/>
  </Router>
), document.getElementById('reactContainer'));
