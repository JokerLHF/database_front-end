import React, { Component, Fragment } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { TeacherMultiple } from './item';







class TeacherCourse extends Component {


  handleOk = () => {
    const { form: { validateFields }, onSure } = this.props;
    validateFields((errors, values) => {
      if (!!errors) {
        console.log(errors)
        return
      }
      values.type = this.hasTeacher ? 1 : 0;
      delete values.courseName;
      onSure(values);
    })
  }

  hasTeacher = false; // 表示是否是有教师重新任课还是一开始就没有 1表示该课程已经有的情况下教师重新任课，  0表示该课程没有教师的情况下 任课

  // 取消
  onCancel = () => {
    this.props.onCancel();
  }


  render () {
    const { form: { getFieldDecorator }, visible, title, selectedRecord } = this.props;
    const { course_name = '', teacher_id } = selectedRecord;
    let teacherList = [];
    if (teacher_id) {
      teacher_id.split(',').forEach(item => {
        teacherList.push(parseInt(item));
      })
      this.hasTeacher = true;
    }
    const formTailLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    return (
      <Modal
        title={"任课管理"}
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
            })(<Input disabled={true} />)}
          </Form.Item>


          <Form.Item label="考试时间">
            {getFieldDecorator('teacherIdList', {
              rules: [{ required: true, message: '请填写名称' }],
              initialValue: '',
            })(<TeacherMultiple initVal={teacherList} />)}
          </Form.Item>



        </Form>
      </Modal>
    )
  }
}
TeacherCourse = Form.create()(TeacherCourse);
export default TeacherCourse
