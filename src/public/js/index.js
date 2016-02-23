import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import routes from '../../private/js/routes';
import reducers from './../../private/js/components/TwitterStore/reducers';

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));

const middleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);

let store = createStoreWithMiddleware(reducer);
middleware.listenForReplays(store);

render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
), document.getElementById('reactContainer'));
