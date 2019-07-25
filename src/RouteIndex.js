import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import HomePage from './HomePage/HomePage';
import Login from './Login/index';
import ErrorPage from './ErrorPage';
import store from './Store/index';
const history = createBrowserHistory();

export default class RouteIndex extends Component {
  constructor(props) {
    super(props);
    this.justfyIsLogin(store.getState().userMessage);
  }
  justfyIsLogin = (userInformation) => {
    if (Object.keys(userInformation).length === 0) { // 先判断是否已经登录, 再判断是空对象, 证明此时没有登陆进来
      history.push('/');
      return;
    }
  }
  render () {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/' key='/Login' component={Login} />
          <Route exact path='/userManage' key='/userManage' component={HomePage} />
          <Route key='404' component={ErrorPage} />
        </Switch>
      </Router>
    )
  }
}
