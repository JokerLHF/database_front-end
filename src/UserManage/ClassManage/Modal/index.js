import React, { Component, Fragment } from 'react';
import { Modal, Form, Input, Button, Radio, message } from 'antd';
import { GradeList, DepartmentList } from './item';
const { TextArea } = Input;
class ClassModal extends Component {


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
    const { departmentId = '', gradeId = '', class_name } = selectedRecord;
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

          <Form.Item label="班级名称">
            {getFieldDecorator('className', {
              rules: [{ required: true, message: '请填写名称' }],
              initialValue: class_name,
            })(<Input />)}
          </Form.Item>

          <Form.Item label="院系">
            {getFieldDecorator('departmentId', {
              rules: [{ required: true, message: '请填写简介' }],
            })(<DepartmentList initVal={departmentId} />)}
          </Form.Item> 

          <Form.Item label="年级">
            {getFieldDecorator('gradeId', {
              rules: [{ required: true, message: '请填写简介' }],
            })(<GradeList initVal={gradeId}/>)}
          </Form.Item>
          
        </Form>
      </Modal>
    )
  }
}
ClassModal = Form.create()(ClassModal);
export default ClassModal
