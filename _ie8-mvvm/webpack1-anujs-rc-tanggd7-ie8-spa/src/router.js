/**
|--------------------------------------------------
| 路由表
|--------------------------------------------------
*/
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import * as pages from './pages';

const prePath = '';

export default class AppRouter extends React.Component {
  createComponent = (Component, props) => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );

  render() {
    return (
      <Router history={browserHistory} createElement={this.createComponent}>
        <Route path={`${prePath}/login`} getComponent={pages.login} />
        <Route path={`${prePath}/desktop`} getComponent={pages.desktop} />
        <Route path={`${prePath}/`} getComponent={pages.login} />
        <Route path={`${prePath}/*`} getComponent={pages.notfound} />
      </Router>
    );
  }
}
