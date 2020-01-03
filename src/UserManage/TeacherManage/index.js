import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';
import { Button, message } from 'antd';
import  TeacherModal  from './Modal/index';
import _fetch from '../../Util/Fetch';
import deleteConfirm from '../../Util/deleteInfo';

class TeacherManage extends Component {
  state = {
    modalVisible: false,
    title: '', 
    editRecord: {}
  }
  selectedRecord = {}
  searchLimit = {
    search: [
      { component: 'InputItem', name: 'teacherId', label: '教师编号' },
      { component: 'InputItem', name: 'teacherName', label: '教师名称' },
      { component: 'InputItem', name: 'departmentName', label: '院系名称' },
    ],
    anotherSearch: {},
    ajaxConfig: {
      url: '/api/teacher/getTeacherDetail',
      type: 'post',
    }
  }
  tableLimit = {
    columns: [{
      title: '教师编号',
      dataIndex: 'id',
      align: 'center',
    },{
      title: '教师名称',
      dataIndex: 'teacher_name',
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
      title: '头衔',
      dataIndex: 'job_title',
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
        <Button className="btn-center" type="primary" icon="plus" onClick={this.addTeacher}>增加</Button>
        <Button className="btn-center" type="danger" icon="minus" onClick={this.deleteTeacher}>删除</Button>
        <Button className="btn-center" type="primary" icon="edit" onClick={this.editTeacher}>修改</Button>
      </div>
    )
  }

  addTeacher = () => {
    this.setState({
      modalVisible: true,
      title: '增加教师',
      editRecord: {}
    })
  }
  deleteTeacher = () => {
    if(!Object.keys(this.selectedRecord).length) {
      message.warning('请选择某一项进行操作');
      return;
    } 
    deleteConfirm('您正在进行删除?', '您正在进行删除操作, 是否继续??',  this.deleteAjax)
  }

  deleteAjax = () => {
    let options = { url: '/api/teacher/deleteTeacher', type: 'post', data: {teacherId: this.selectedRecord.id} };
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

  editTeacher = () => {
    if(!Object.keys(this.selectedRecord).length) {
      message.warning('请选择某一项进行操作');
      return;
    } 
    this.setState({
      modalVisible: true,
      title: '编辑教师',
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
    if(title === '增加教师') {
      url = '/api/teacher/addTeacher';
    } else {
      url = '/api/teacher/updateTeacher';
      values.teacherId = this.selectedRecord.id;
    }
    let options = { url, type: 'post', data: values };
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
        <TeacherModal 
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
export default TeacherManage;