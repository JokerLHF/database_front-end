import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';
import { Button, message } from 'antd';
import  StudentModal  from './Modal/index';
import _fetch from '../../Util/Fetch';
import deleteConfirm from '../../Util/deleteInfo';

class StudentManage extends Component {
  state = {
    modalVisible: false,
    title: '', 
    editRecord: {}
  }
  selectedRecord = {}
  searchLimit = {
    search: [
      { component: 'InputItem', name: 'studentId', label: '学生编号' },
      { component: 'InputItem', name: 'studentName', label: '学生姓名' },
      { component: 'InputItem', name: 'className', label: '班级名称' },
      { component: 'InputItem', name: 'gradeName', label: '年级名称' },
    ],
    anotherSearch: {},
    ajaxConfig: {
      url: '/api/student/getStudentDetail',
      type: 'post',
    }
  }
  tableLimit = {
    columns: [{
      title: '学生编号',
      dataIndex: 'id',
      align: 'center',
    },{
      title: '姓名',
      dataIndex: 'student_name',
      align: 'center',
    }, {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
    }, {
      title: '出生日期',
      dataIndex: 'born_day',
      align: 'center'
    }, {
      title: '入学成绩',
      dataIndex: 'admission_grade',
      align: 'center'
    }, {
      title: '班级',
      dataIndex: 'class_name',
      align: 'center'
    }, {
      title: '年级',
      dataIndex: 'grade_name',
      align: 'center'
    }, {
      title: '院系',
      dataIndex: 'department_name',
      align: 'center'
    }],
    ajaxConfig: {
      url: '/api/teacher/getTeacherDetail',
      type: 'post',
    }
  }

  renderButtonList = () => {
    return(
      <div className="btn-list">
        <Button className="btn-center" type="primary" icon="plus" onClick={this.addStudent}>增加</Button>
        <Button className="btn-center" type="danger" icon="minus" onClick={this.deleteStudent}>退学</Button>
        <Button className="btn-center" type="primary" icon="edit" onClick={this.editStudent}>修改</Button>
      </div>
    )
  }

  addStudent = () => {
    this.setState({
      modalVisible: true,
      title: '增加学生',
      editRecord: {}
    })
  }
  deleteStudent = () => {
    if(!Object.keys(this.selectedRecord).length) {
      message.warning('请选择某一项进行操作');
      return;
    } 
    deleteConfirm('您正在进行删除?', '您正在进行删除操作, 是否继续??',  this.deleteAjax)
  }

  deleteAjax = () => {
    let options = { url: '/api/student/dropOutStu', type: 'post', data: {studentId: this.selectedRecord.id} };
    _fetch(options).then(res => {
      if(res.errno === 0) {
        message.success('操作成功');
        this.getAllData();
        this.selectedRecord = {};
        return;
      }
      message.error('操作失败')
    })
  }

  editStudent = () => {
    if(!Object.keys(this.selectedRecord).length) {
      message.warning('请选择某一项进行操作');
      return;
    } 
    this.setState({
      modalVisible: true,
      title: '编辑学生',
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
    if(title === '增加学生') {
      url = '/api/student/addStudent';
    } else {
      url = '/api/student/updateStudent';
      values.studentId = this.selectedRecord.id;
    }
    values.departmentId = values.dept_grade_class[0]; // 院系id
    values.gradeId = values.dept_grade_class[1]; // 年级id
    values.classId = values.dept_grade_class[2]; // 班级id
    delete values.dept_grade_class;
    let options = { url, type: 'post', data: values };
    console.log(options);
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
export default StudentManage;