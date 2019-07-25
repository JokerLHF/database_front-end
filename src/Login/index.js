import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import _fetch from '../Util/Fetch';
import store from '../Store/index';
import { loginUserInformation } from '../Store/actionCreator';
import './login.less';
class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        console.log(err)
        return
      }
      console.log(values)
      const options = {
        url: '/login',
        data: values,
        type: 'post'
      }
      _fetch(options).then(response => {
        console.log(response)
        if (response.code === 200) {
          let information = Object.assign({}, response.data, { "isLogin": true });
          const action = loginUserInformation(information); // 把用户信息传给store
          store.dispatch(action);
          this.props.history.push('/userManage');
        } else {
          message.warning("账号或密码错误");
        }
      })
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-div">
        <div className="login-content-div">
          <div className="form-title">Sign in</div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="username"
                  className="login-form-userName"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input.Password
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="password"
                  className="login-form-password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <Button type="primary" className="login-form-button" htmlType="submit">Log in</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
Login = Form.create({})(Login);
export default Login;