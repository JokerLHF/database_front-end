import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';
import { Button, message } from 'antd';
import  DepartModal  from './Modal/index';
import _fetch from '../../Util/Fetch';
import deleteConfirm from '../../Util/deleteInfo';
// import './index.less';
class DepartmentManage extends Component {
  state = {
    modalVisible: false,
    title: ''
  }
  selectedRecord = {}
  searchLimit = {
    search: [
      { component: 'InputItem', name: 'departmentName', label: '院系名称' },
    ],
    anotherSearch: {},
    ajaxConfig: {
      url: '/api/department/getDetailDepartment',
      type: 'post',
    }
  }
  tableLimit = {
    columns: [{
      title: '学院名称',
      dataIndex: 'department_name',
      align: 'center',
    }, {
      title: '学院简介',
      dataIndex: 'department_introduction',
      align: 'center',
    }],
    ajaxConfig: {
      url: '/api/department/getDetailDepartment',
      type: 'post',
    }
  }

  renderButtonList = () => {
    return(
      <div className="btn-list">
        <Button className="btn-center" type="primary" icon="plus" onClick={this.addDepartment}>增加</Button>
        <Button className="btn-center" type="danger" icon="minus" onClick={this.deleteDepartment}>删除</Button>
        <Button className="btn-center" type="primary" icon="edit" onClick={this.editDepartment}>修改</Button>
      </div>
    )
  }

  addDepartment = () => {
    this.setState({
      modalVisible: true,
      title: '增加院系'
    })
  }
  deleteDepartment = () => {
    if(!Object.keys(this.selectedRecord).length) {
      message.warning('请选择某一项进行操作');
      return;
    } 
    deleteConfirm('您正在进行删除?', '您正在进行删除操作, 是否继续??',  this.deleteAjax)
  }
  deleteAjax = () => {
    let options = { url: '/api/department/deleteDepartment', type: 'post', data: {departmentId: this.selectedRecord.id} };
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

  editDepartment = () => {
    if(!Object.keys(this.selectedRecord).length) {
      message.warning('请选择某一项进行操作');
      return;
    } 
    this.setState({
      modalVisible: true,
      title: '编辑院系'
    })
  }

  onCancel = () => {
    this.setState({
      modalVisible: false,
      title: ''
    })
  }
  onSure = (values) => {
    const { title } = this.state;
    let url = '';
    if(title === '增加院系') {
      url = '/api/department/addDepartment';
    } else {
      url = '/api/department/updateDepartment';
      values.departmentId = this.selectedRecord.id;
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
      <div className="department-div">
        <SearchForm
          searchLimit={this.searchLimit}
          returnGetAllData={(func) => {this.getAllData = func}}
        />
        {this.renderButtonList()}
        <TableData
          tableLimit={this.tableLimit}
          selected={this.returnSelected}
        />
        <DepartModal 
          visible={this.state.modalVisible}
          title={this.state.title}
          onSure={this.onSure}
          onCancel={this.onCancel}
          selectedRecord={this.selectedRecord}
        />
      </div>
    )
  }
}
export default DepartmentManage;