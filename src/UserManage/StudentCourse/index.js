import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';
import { Button, message } from 'antd';
import _fetch from '../../Util/Fetch';
import deleteConfirm from '../../Util/deleteInfo';

class StudentCourse extends Component {
  state = {
    modalVisible: false,
    title: '',
    editRecord: {},
    teacherCourseVisible: false,
  }
  selectedRecord = {}
  searchLimit = {
    search: [
      { component: 'InputItem', name: 'courseName', label: '课程名称' },
      { component: 'InputItem', name: 'teacherName', label: '教师名称' },
    ],
    anotherSearch: {
      studentId: parseInt(JSON.parse(localStorage.getItem('userMessage') || {}).userName),
    },
    ajaxConfig: {
      url: '/api/course/getHasTeacherCourse',
      type: 'post',
    }
  }
  tableLimit = {
    columns: [{
      title: '课程名称',
      dataIndex: 'course_name',
      align: 'center',
    }, {
      title: '开始时间',
      dataIndex: 'exam_time',
      align: 'center',
    }, {
      title: '学分',
      dataIndex: 'course_credit',
      align: 'center',
    }, {
      title: '学时',
      dataIndex: 'course_hours',
      align: 'center'
    }, {
      title: '开始上课时间',
      dataIndex: 'course_start_time',
      align: 'center'
    }, {
      title: '上课地点',
      dataIndex: 'course_location',
      align: 'center'
    }, {
      title: '任课老师名称',
      dataIndex: 'teacher_name',
      align: 'center'
    }],
    ajaxConfig: {
      url: '/api/course/getHasTeacherCourse',
      type: 'post',
    }
  }

  renderButtonList = () => {
    return (
      <div className="btn-list">
        <Button className="btn-center" type="primary" icon="plus" onClick={this.selectCourse}>选课</Button>
      </div>
    )
  }

  getAllData = () => { }
  returnSelected = (values) => {
    this.selectedRecord = values;
  }

  selectCourse = () => {
    if (!Object.keys(this.selectedRecord).length) {
      message.warning('请选择某一项进行操作');
      return;
    }
    this.onTeacherCourseSure();
  }

  onTeacherCourseSure = () => {
    let values = {
      courseId: this.selectedRecord.course_id,
      teacherId: this.selectedRecord.teacher_id,
      studentId: parseInt(JSON.parse(localStorage.getItem('userMessage') || {}).userName),
    };

    let options = { url: '/api/student-course/setStudentCourse', type: 'post', data: values };
    _fetch(options).then(res => {
      if (res.errno === 0) {
        message.success('操作成功');
        this.getAllData()
        return;
      }
      message.error('操作失败')
    })
  }

  render () {
    return (
      <div>
        <SearchForm
          searchLimit={this.searchLimit}
          returnGetAllData={(func) => { this.getAllData = func }}
        />
        {this.renderButtonList()}
        <TableData
          tableLimit={this.tableLimit}
          selected={this.returnSelected}
        />
      </div>
    )
  }
}
export default StudentCourse;