import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import UserManage from './UserManage';
import FeatureFirst from './UserManage/FeatureFirst';
import FeatureSecond from './UserManage/FeatureSecond';
import FeatureThird from './UserManage/FeatureThird';
import ZengWeb from './UserManage/ZengWeb';
import LoginForm from './Login';
import ErrorPage from './ErrorPage';
const history = createBrowserHistory();

export const OuterRoute = [{
  route: '/',
  exact: true,
  component: LoginForm,
}, {
  route: '/userManage',
  component: UserManage,
  children: [{
    route: '/userManage',
    exact: true,
    component: FeatureFirst,
    text: '功能1管理'
  }, {
    route: '/userManage/features-second',
    exact: true,
    component: FeatureSecond,
    text: '功能2管理'
  }, {
    route: '/userManage/features-third',
    exact: true,
    component: FeatureThird,
    text: '功能3管理'
  }, {
    route: '/userManage/zeng-web',
    exact: true,
    component: ZengWeb,
    text: '表格管理'
  }, {
    component: ErrorPage
  }]
}, {
  component: ErrorPage
}]

export default class RouteIndex extends Component {

  render () {
    return (
      <Router history={history}>
        <Switch>
          {
            OuterRoute.map((router, index) => {
              const { exact = false, component, route } = router;
              return (
                <Route exact={exact} path={route ? route : null} key={index} component={component} />
              )
            })
          }
        </Switch>
      </Router>
    )
  }
}
