import React, { Component, Fragment } from 'react';
import { Modal, Form, Input, Button, Radio, message, Select, DatePicker  } from 'antd';
import { GradeList, DepartmentList } from '../../ClassManage/Modal/item';
import moment from 'moment';
const { TextArea } = Input;
const { Option } = Select;

class TeacherModal extends Component {


  handleOk = () => {
    const { form: { validateFields }, onSure } = this.props;
    validateFields((errors, values) => {
      if (!!errors) {
        console.log(errors)
        return
      }
      console.log(values.bornDay)
      values.bornDay = values.bornDay.format('YYYY-MM-DD HH:mm:ss')
      onSure(values);
    })
  }


  // 取消
  onCancel = () => {
    this.props.onCancel();
  }

  returnSex = () => {
    return(
      <Select>
        <Option value="男">男</Option>
        <Option value="女">女</Option>
      </Select>
    )
  }

  render () {
    const { form: { getFieldDecorator }, visible, title, selectedRecord  } = this.props;
    let { department_id = '', sex = '男', teacher_name = '', born_day = null, job_title ='' } = selectedRecord;
    if(born_day) {
      born_day = moment(born_day);
    }
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

          <Form.Item label="教师名称">
            {getFieldDecorator('teacherName', {
              rules: [{ required: true, message: '请填写名称' }],
              initialValue: teacher_name,
            })(<Input />)}
          </Form.Item>
          
          <Form.Item label="性别">
            {getFieldDecorator('sex', {
              rules: [{ required: true, message: '请填写名称' }],
              initialValue: sex,
            })(this.returnSex())}
          </Form.Item>

          <Form.Item label="出身日期">
            {getFieldDecorator('bornDay', {
              rules: [{ required: true, message: '请填写名称' }],
              initialValue: born_day,
            })(<DatePicker />)}
          </Form.Item>

          <Form.Item label="头衔">
            {getFieldDecorator('jobTitle', {
              rules: [{ required: true, message: '请填写名称' }],
              initialValue: job_title,
            })(<Input />)}
          </Form.Item>


           <Form.Item label="院系">
            {getFieldDecorator('departmentId', {
              rules: [{ required: true, message: '请填写简介' }],
            })(<DepartmentList initVal={department_id} />)}
          </Form.Item> 

  
          
        </Form>
      </Modal>
    )
  }
}
TeacherModal = Form.create()(TeacherModal);
export default TeacherModal
