import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from './components/Main/Main';
import Home from './components/Home/Home';
import Page404 from './components/ErrPage/Page404';
import Vote from './components/Vote/Vote';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Route path="vote/(:vid)" component={Vote} />
    <Route path="*" component={Page404} />
  </Route>
);
