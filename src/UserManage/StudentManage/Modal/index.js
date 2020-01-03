import React, { Component, Fragment } from 'react';
import { Modal, Form, Input, Button, Radio, message, Select, DatePicker  } from 'antd';
import { DepartGradeClazz } from './item';
import moment from 'moment';
const { TextArea } = Input;
const { Option } = Select;

class StudentModal extends Component {


  handleOk = () => {
    const { form: { validateFields }, onSure } = this.props;
    validateFields((errors, values) => {
      if (!!errors) {
        console.log(errors)
        return
      }
      values.bornDay = values.bornDay.format('YYYY-MM-DD HH:mm:ss')
      console.log(values)
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
    let { department_id = '', grade_id = '', class_id = '', sex = '男', student_name = '', born_day = null, admission_grade ='' } = selectedRecord;
    if(born_day) {
      born_day = moment(born_day);
    }
    let casIdLst = department_id ? [department_id, grade_id, class_id] : []; // 没有department_id就是增加的时候
    // console.log(casIdLst)
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

          <Form.Item label="学生名称">
            {getFieldDecorator('studentName', {
              rules: [{ required: true, message: '请填写名称' }],
              initialValue: student_name,
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

          <Form.Item label="入学成绩">
            {getFieldDecorator('admissionGrade', {
              rules: [{ required: true, message: '请填写名称' }],
              initialValue: admission_grade,
            })(<Input />)}
          </Form.Item>


           <Form.Item label="院系/年级/班级">
            {getFieldDecorator('dept_grade_class', {
              rules: [{ required: true, message: '请填写所属' }],
            })(<DepartGradeClazz  initVal={casIdLst}/>)}
          </Form.Item> 
          
          
  
          
        </Form>
      </Modal>
    )
  }
}
StudentModal = Form.create()(StudentModal);
export default StudentModal
