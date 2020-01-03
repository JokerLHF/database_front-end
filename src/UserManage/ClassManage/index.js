import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';
import { Button, message } from 'antd';
import  ClassModal  from './Modal/index';
import _fetch from '../../Util/Fetch';
import deleteConfirm from '../../Util/deleteInfo';

class ClassManage extends Component {
  state = {
    modalVisible: false,
    title: '', 
    editRecord: {}
  }
  selectedRecord = {}
  searchLimit = {
    search: [
      { component: 'InputItem', name: 'keywords', label: '关键字搜索' },
    ],
    anotherSearch: {},
    ajaxConfig: {
      url: '/api/class/getClassDetail',
      type: 'post',
    }
  }
  tableLimit = {
    columns: [{
      title: '班级名称',
      dataIndex: 'class_name',
      align: 'center',
    }, {
      title: '年级',
      dataIndex: 'grade_name',
      align: 'center',
    }, {
      title: '院系',
      dataIndex: 'department_name',
      align: 'center'
    }],
    ajaxConfig: {
      url: '/api/class/getClassDetail',
      type: 'post',
    }
  }

  renderButtonList = () => {
    return(
      <div className="btn-list">
        <Button className="btn-center" type="primary" icon="plus" onClick={this.addClazz}>增加</Button>
        <Button className="btn-center" type="danger" icon="minus" onClick={this.deleteClazz}>删除</Button>
        <Button className="btn-center" type="primary" icon="edit" onClick={this.editClazz}>修改</Button>
      </div>
    )
  }

  addClazz = () => {
    this.setState({
      modalVisible: true,
      title: '增加班级',
      editRecord: {}
    })
  }
  deleteClazz = () => {
    if(!Object.keys(this.selectedRecord).length) {
      message.warning('请选择某一项进行操作');
      return;
    } 
    deleteConfirm('您正在进行删除?', '您正在进行删除操作, 是否继续??',  this.deleteAjax)
  }

  deleteAjax = () => {
    let options = { url: '/api/class/deleteClass', type: 'post', data: {classId: this.selectedRecord.id} };
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

  editClazz = () => {
    if(!Object.keys(this.selectedRecord).length) {
      message.warning('请选择某一项进行操作');
      return;
    } 
    this.setState({
      modalVisible: true,
      title: '编辑班级',
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
    if(title === '增加班级') {
      url = '/api/class/addClass';
    } else {
      url = '/api/class/updateClass';
      values.classId = this.selectedRecord.id;
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
        <ClassModal 
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
export default ClassManage;