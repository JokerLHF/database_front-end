import React, { Component, Fragment } from 'react';
import { Modal, Form, Input, Button, Radio, message, Select, DatePicker  } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

class CourseModal extends Component {


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
    let { exam_grade = '', usual_grade = '', all_grade = '' } = selectedRecord;
 
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

          <Form.Item label="期末成绩">
            {getFieldDecorator('examGrade', {
              rules: [{ required: true, message: '请填写名称' }],
              initialValue: exam_grade,
            })(<Input />)}
          </Form.Item>
          
          <Form.Item label="平时成绩">
            {getFieldDecorator('usualGrade', {
              rules: [{ required: true, message: '请填写名称' }],
              initialValue: usual_grade,
            })(<Input />)}
          </Form.Item>

          <Form.Item label="总成绩">
            {getFieldDecorator('allGrade', {
              rules: [{ required: true, message: '请填写名称' }],
              initialValue: all_grade,
            })(<Input />)}
          </Form.Item>

        </Form>
      </Modal>
    )
  }
}
CourseModal = Form.create()(CourseModal);
export default CourseModal
