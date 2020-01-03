import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Icon, message } from 'antd';
import { loginUserInformation } from '../../Store/actionCreator';
import _fetch from '../../Util/Fetch';
import './index.less';

class ChangeMessage extends Component {

  state = {
    oldPassword: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        message.error('请填写完整信息');
        return
      }

      delete values['password-again'];

      const options = {
        url: '/administrator/updatePassword',
        data: values,
        type: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
      _fetch(options).then(res => {
        if (res.code === 0 && res.success) {
          message.success('修改成功');
          this.props.form.resetFields();
        } else {
          message.error(res.message);
        }
      });
    })
  };

  oldPswChange = (e) => {
    this.setState({ oldPassword: e.target.value })
  }

  render () {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="change-outer-message">
        <div className="title-tip">修改用户信息:</div>
        <Form onSubmit={this.handleSubmit} className="change-message-form">

          <Form.Item label="用户名">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="username"
              />,
            )}
          </Form.Item>

          <Form.Item label="旧密码">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your old-password!' }],
            })(
              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="password"
              />,
            )}
          </Form.Item>

          <Form.Item label="新密码">
            {getFieldDecorator('newPassword', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="password"
                onChange={this.oldPswChange}
              />,
            )}
          </Form.Item>

          <Form.Item label="确认密码">
            {getFieldDecorator('password-again', {
              rules: [
                { required: true, message: 'Please input your Password again!' },
                { validator: (rule, value, cb) => (value !== this.state.oldPassword ? cb('两次密码不一样') : cb()) },
                //cb表示错误, value表示input的value, 正确也必须有一个回调函数
              ],
            })(
              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="password"
              />,
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" className="change-form-button" htmlType="submit">Sumbit</Button>
          </Form.Item>

        </Form>
      </div >
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

ChangeMessage = connect(null, mapDispatchToProps)(Form.create({})(ChangeMessage));

export default ChangeMessage;
