import React, { Component, Fragment } from 'react';
import { Modal, Form, Input, Button, Radio, message } from 'antd';
const { TextArea } = Input;
class DepartModal extends Component {



  handleOk = () => {
    const { form: { validateFields }, onSure } = this.props;
    validateFields((errors, values) => {
      if (!!errors) {
        console.log(errors)
        return
      }
      onSure(values);
    })
  }


  // 取消
  onCancel = () => {
    this.props.onCancel();
  }





  render () {
    const { form: { getFieldDecorator }, visible, title, selectedRecord  } = this.props;
    const { department_name = '', department_introduction = '' } = selectedRecord;
    const formTailLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <Modal
        title={title}
        visible={visible}
        onCancel={this.onCancel}
        onOk={this.handleOk}
        footer={[
          <Button key="submit" htmlType="submit" type="primary" onClick={this.handleOk}>确定</Button>,
          <Button key="back" onClick={this.onCancel}>取消</Button>
        ]}
        destroyOnClose // modal关闭之后清除子元素
      >
        <Form {...formTailLayout}>

          <Form.Item label="名称">
            {getFieldDecorator('departmentName', {
              rules: [{ required: true, message: '请填写名称' }],
              initialValue: department_name,
            })(<Input />)}
          </Form.Item>


          <Form.Item label="简介">
            {getFieldDecorator('departmentIntroduction', {
              rules: [{ required: true, message: '请填写简介' }],
              initialValue: department_introduction,
            })(<TextArea rows={4}/>)}
          </Form.Item>

        </Form>
      </Modal>
    )
  }
}
DepartModal = Form.create()(DepartModal);
export default DepartModal
