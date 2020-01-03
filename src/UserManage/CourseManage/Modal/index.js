import React, { Component, Fragment } from 'react';
import { Modal, Form, Input, InputNumber, Button, Radio, message, Select, DatePicker  } from 'antd';
import { GradeList, DepartmentList } from '../../ClassManage/Modal/item';
import moment from 'moment';
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

      values.CourseStartTime = values.CourseStartTime.format('YYYY-MM-DD HH:mm:ss')
      values.examTime = values.examTime.format('YYYY-MM-DD HH:mm:ss')

      onSure(values);
    })
  }


  // 取消
  onCancel = () => {
    this.props.onCancel();
  }


  render () {
    const { form: { getFieldDecorator }, visible, title, selectedRecord  } = this.props;
    let { course_name = '', exam_time = null, course_credit ='', course_hours = '', course_start_time = null, course_location = '' } = selectedRecord;
    const formTailLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    if(exam_time) {
      exam_time = moment(exam_time);
    }
    if(course_start_time) {
      course_start_time = moment(course_start_time);
    }
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

          <Form.Item label="课程名称">
            {getFieldDecorator('courseName', {
              rules: [{ required: true, message: '请填写名称' }],
              initialValue: course_name,
            })(<Input />)}
          </Form.Item>


          <Form.Item label="考试时间">
            {getFieldDecorator('examTime', {
              rules: [{ required: true, message: '请填写名称' }],
              initialValue: exam_time,
            })(<DatePicker />)}
          </Form.Item>

          <Form.Item label="学分">
            {getFieldDecorator('courseCredit', {
              rules: [{ required: true, message: '请填写名称' }],
              initialValue: course_credit,
            })(<InputNumber />)}
          </Form.Item>


           <Form.Item label="学时">
            {getFieldDecorator('courseHours', {
              rules: [{ required: true, message: '请填写简介' }],
              initialValue: course_hours,
            })(<InputNumber />)}
          </Form.Item> 
          
          <Form.Item label="开始上课时间">
            {getFieldDecorator('CourseStartTime', {
              rules: [{ required: true, message: '请填写名称' }],
              initialValue: course_start_time,
            })(<DatePicker />)}
          </Form.Item>
          
          <Form.Item label="上课地点">
            {getFieldDecorator('courseLocation', {
              rules: [{ required: true, message: '请填写简介' }],
              initialValue: course_location,     
            })(<Input />)}
          </Form.Item> 
          
        </Form>
      </Modal>
    )
  }
}
CourseModal = Form.create()(CourseModal);
export default CourseModal
