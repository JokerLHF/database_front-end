import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import { loginUserInformation } from '../Store/actionCreator';
import _fetch from '../Util/Fetch';
import './login.less';
class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        message.error('请填写完整信息');
        return
      }
      const options = {
        url: '/api/users/login',
        data: values,
        type: 'post',
        headers: { 'Content-Type': 'application/json' }
      }
      _fetch(options).then(response => {
        if (response.errno === 0) {
          let information = Object.assign({}, values, { "isLogin": true });
          this.props.userMessageToStore(information); // 把用户信息传给store
          localStorage.setItem('userMessage', JSON.stringify(values));
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
              <Button type="primary" className="login-form-button" htmlType="submit">Log in</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    userMessageToStore (information) {
      const action = loginUserInformation(information);
      dispatch(action);
    }
  }
}

const LoginForm = connect(null, mapDispatchToProps)(Form.create({})(Login));

export default LoginForm;
