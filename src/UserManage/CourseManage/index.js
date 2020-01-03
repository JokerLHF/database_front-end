import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';
import { Button, message } from 'antd';
import CourseModal from './Modal/index';
import TeacherCourse from './Modal/teacherCourse';
import _fetch from '../../Util/Fetch';
import deleteConfirm from '../../Util/deleteInfo';

class CourseManage extends Component {
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
    anotherSearch: {},
    ajaxConfig: {
      url: '/api/course/getCourseDetail',
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
      url: '/api/course/getCourseDetail',
      type: 'post',
    }
  }

  renderButtonList = () => {
    return (
      <div className="btn-list">
        <Button className="btn-center" type="primary" icon="plus" onClick={this.addCourse}>增加</Button>
        <Button className="btn-center" type="danger" icon="minus" onClick={this.deleteCourse}>删除</Button>
        <Button className="btn-center" type="primary" icon="edit" onClick={this.editCourse}>修改</Button>
        <Button className="btn-center" type="primary" icon="plus" onClick={this.setTeacherCourse}>教师任课</Button>
      </div>
    )
  }

  setTeacherCourse = () => {
    if (!Object.keys(this.selectedRecord).length) {
      message.warning('请选择某一项进行操作');
      return;
    }
    this.setState({ teacherCourseVisible: true, editRecord: this.selectedRecord })
  }

  addCourse = () => {
    this.setState({
      modalVisible: true,
      title: '增加课程',
      editRecord: {}
    })
  }
  deleteCourse = () => {
    if (!Object.keys(this.selectedRecord).length) {
      message.warning('请选择某一项进行操作');
      return;
    }
    deleteConfirm('您正在进行删除?', '您正在进行删除操作, 是否继续??', this.deleteAjax)
  }

  deleteAjax = () => {
    let options = { url: '/api/course/deleteCourse', type: 'post', data: { courseId: this.selectedRecord.id } };
    _fetch(options).then(res => {
      if (res.errno === 0) {
        message.success('操作成功');
        this.getAllData();
        this.selectedRecord = {};
        return;
      }
      message.error('操作失败')
    })
  }

  editCourse = () => {
    if (!Object.keys(this.selectedRecord).length) {
      message.warning('请选择某一项进行操作');
      return;
    }
    this.setState({
      modalVisible: true,
      title: '编辑课程',
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
    const { title } = this.state;
    let url = '';
    if (title === '增加课程') {
      url = '/api/course/addCourse';
    } else {
      url = '/api/course/updateCourse';
      values.courseId = this.selectedRecord.id;
    }
    let options = { url, type: 'post', data: values };
    // console.log(options);
    _fetch(options).then(res => {
      if (res.errno === 0) {
        message.success('操作成功');
        this.onCancel();
        this.getAllData()
        return;
      }
      message.error('操作失败')
    })
  }
  getAllData = () => { }
  returnSelected = (values) => {
    this.selectedRecord = values;
  }


  onTeacherCourseSure = (values) => {
    values.courseId = this.selectedRecord.id;
    let options = { url: '/api/teacher-course/setTeacherToCourse', type: 'post', data: values };
    _fetch(options).then(res => {
      if (res.errno === 0) {
        message.success('操作成功');
        this.onTeacherCourseCancel();
        this.getAllData()
        return;
      }
      message.error('操作失败')
    })
  }

  onTeacherCourseCancel = () => {
    this.setState({ teacherCourseVisible: false })
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
        <CourseModal
          visible={this.state.modalVisible}
          title={this.state.title}
          onSure={this.onSure}
          onCancel={this.onCancel}
          selectedRecord={this.state.editRecord}
        />
        <TeacherCourse
          visible={this.state.teacherCourseVisible}
          onSure={this.onTeacherCourseSure}
          onCancel={this.onTeacherCourseCancel}
          selectedRecord={this.state.editRecord}
        />
      </div>
    )
  }
}
export default CourseManage;