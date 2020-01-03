import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';
import { Button, message } from 'antd';
import  StudentModal  from './Modal/index';
import _fetch from '../../Util/Fetch';
import deleteConfirm from '../../Util/deleteInfo';

class TeacherCourseManage extends Component {
  state = {
    modalVisible: false,
    title: '', 
    editRecord: {}
  }
  selectedRecord = {}
  searchLimit = {
    search: [
      { component: 'InputItem', name: 'courseName', label: '课程名称' },
      { component: 'InputItem', name: 'studentName', label: '学生姓名' },
    ],
    anotherSearch: {
      teacherId: parseInt(JSON.parse(localStorage.getItem('userMessage') || {}).userName)
    },
    ajaxConfig: {
      url: '/api/teacher-course/getStudentGradeDetail',
      type: 'post',
    }
  }
  tableLimit = {
    columns: [{
      title: '学生编号',
      dataIndex: 'student_id',
      align: 'center',
    },{
      title: '姓名',
      dataIndex: 'student_name',
      align: 'center',
    }, {
      title: '课程名称',
      dataIndex: 'course_name',
      align: 'center',
    }, {
      title: '期末成绩',
      dataIndex: 'exam_grade',
      align: 'center'
    }, {
      title: '平时成绩',
      dataIndex: 'usual_grade',
      align: 'center'
    }, {
      title: '总成绩',
      dataIndex: 'all_grade',
      align: 'center'
    }],
    ajaxConfig: {
      url: '/api/teacher-course/getStudentGradeDetail',
      type: 'post',
    }
  }

  renderButtonList = () => {
    return(
      <div className="btn-list">
        <Button className="btn-center" type="primary" icon="edit" onClick={this.editGrade}>修改成绩</Button>
      </div>
    )
  }

  editGrade = () => {
    if(!Object.keys(this.selectedRecord).length) {
      message.warning('请选择某一项进行操作');
      return;
    } 
    this.setState({
      modalVisible: true,
      title: '修改成绩',
      editRecord: this.selectedRecord
    })
  }

  onCancel = () => {
    this.setState({
      modalVisible: false,
      title: '',
      editRecord: {}
    })
  }
  onSure = (values) => {
    values.studentId = this.selectedRecord.student_id
    values.courseId = this.selectedRecord.course_id
    values.teacherId = this.selectedRecord.teacher_id
    let options = {url: '/api/teacher-course/updateStudentGrade', type: 'post', data: values}
   
    _fetch(options).then(res => {
      if(res.errno === 0) {
        message.success('操作成功');
        this.onCancel();
        this.getAllData()
        return;
      }
      message.error('操作失败')
    })
  }
  getAllData = () => {}
  returnSelected = (values) => {
    this.selectedRecord = values;
  }
  // changeSeachLimit = (data) => {
  //   let userName = JSON.parse(localStorage.getItem('userMessage') || {}).userName;
  //   data.teacherId = userName;
  //   return data;
  // }
  render() {
    return(
      <div>
        <SearchForm
          searchLimit={this.searchLimit}
          returnGetAllData={(func) => {this.getAllData = func}}

        />
        {this.renderButtonList()}
        <TableData
          tableLimit={this.tableLimit}
          selected={this.returnSelected}
        />
        <StudentModal 
          visible={this.state.modalVisible}
          title={this.state.title}
          onSure={this.onSure}
          onCancel={this.onCancel}
          selectedRecord={this.state.editRecord}
        />
      </div>
    )
  }
}
export default TeacherCourseManage;