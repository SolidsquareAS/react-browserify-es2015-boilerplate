import React from 'react';
import { render } from 'react-dom';
import HomePage from '../../private/js/components/HomePage';

import express from 'express';
import { Router, Route, hashHistory } from 'react-router'

render((
  <Router history={hashHistory}>
    <Route path="/" component={HomePage}/>
  </Router>
), document.getElementById('reactContainer'));
