import React, { Component } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import { Layout, Menu, Icon, message, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { OuterRoute } from '../RouteIndex';
import store from '../Store';
import './index.less';
const { Header, Sider, Content } = Layout;


class UserManage extends Component {

  state = {
    collapsed: false,
  };

  componentDidMount () {
    // this.judgeIsLogin();
  }

  judgeIsLogin = () => { // 判断是否登录， 根据store里面是否存储了用户名。
    if (!Object.keys(store.getState().userMessage).length) {
      this.props.history.push('/');
      message.warning('请先登录');
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  getRouteChildList = () => { // 返回该路由的子路由
    let pathName = '/userManage';
    for (let i = 0; i < OuterRoute.length; i++) {
      let item = OuterRoute[i];
      if (item.route === pathName) {
        return item;
      }
    }
  }

  renderMenu = () => { // 渲染左边的menu路由
    let { children } = this.getRouteChildList();
    let childList = children.slice(0, children.length - 1); // 切割掉404的信息
    let selectedIndex = this.justyMenuSelectIndex(childList);
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedIndex.toString()]}>
        {
          childList.map((item, index) => {
            const { text, route } = item;
            return (
              <Menu.Item key={index}>
                <Link to={route}><span>{text}</span></Link>
              </Menu.Item>
            )
          })
        }
      </Menu>
    )
  }

  justyMenuSelectIndex = (children) => { // 计算被选中的menu的index, 便于用户在搜索栏输入路由展示的时候左边的menu没办法对应选中
    let pathName = this.props.location.pathname;
    for (let i = 0; i < children.length; i++) {
      let item = children[i];
      if (item.route === pathName) {
        return i;  // 返回对应的路由index
      }
    }
    return 0;  // 默认展开第一个
  }
  renderSwitchRoute = () => { // 渲染switch的路由
    let { children } = this.getRouteChildList();
    return (
      <Switch>
        {
          children.map((router, index) => {
            const { exact = false, component, route } = router;
            return (
              <Route exact={exact} path={route ? route : null} key={index} component={component} />
            )
          })
        }
      </Switch>
    )
  }
  render () {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="user-manage">
            <Tooltip placement="right" title={`用户名:${this.props.userMessage.userName}`}>
              用户名: {this.props.userMessage.userName}
            </Tooltip>
          </div>
          {this.renderMenu()}
        </Sider>
        <Layout>
          <Header>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content>
            {this.renderSwitchRoute()}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userMessage: state.userMessage
  }
}
export default connect(mapStateToProps, null)(UserManage);