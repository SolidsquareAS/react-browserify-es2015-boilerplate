import React from 'react';
import { Route } from 'react-router';
import App from './components/App';

export const Routes = () => {
  return (
    <Route path="/" component={App}/>
  );
};

export default {Routes};
