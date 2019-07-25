import React, { Component } from 'react';
import SearchForm from '../Public/SearchForm/searchForm';
import TableData from '../Public/TableData/index';
import _fetch from '../Util/Fetch'
import store from '../Store/index';
import './information.less';
export default class UserInformation extends Component {

  state = {
    tableData: [], // table表格的数据
    searchCondition: {}, // 搜索条件
    paginationData: { current: 1, total: 0 }, // 分页的对象数据, total, current
  }

  searchLimit = {
    search: [],
    anotherSearch: { id: store.getState().userMessage.id }, // 一些额外的搜索条件, eg: 不是搜索框的数据,没有的话传一个 {}
    url: '/course',
  }



  columns = [
    {
      title: '课程名称',
      dataIndex: 'name',
      align: 'center',
      width: 150,
    },
    {
      title: '学期',
      dataIndex: 'semesterName',
      align: 'center',
      width: 150,
    },
    {
      title: '学校名称',
      dataIndex: 'schoolName',
      align: 'center',
      width: 150,
    },
    {
      title: '年级id',
      dataIndex: 'groupId',
      align: 'center',
    }];

  resetTableCondition = (tableData, searchCondition, paginationData) => {
    this.setState({ tableData, searchCondition, paginationData });
  }


  render () {
    return (
      <div className="searh-form-tip search-form-table-information-div">
        <span className="userInformation-title">用户信息表</span>
        <SearchForm
          searchLimit={this.searchLimit}
          returnData={this.resetTableCondition}
          tablePaginationData={this.state.paginationData}
          searchButton="搜索"
        />
        <TableData
          columns={this.columns}
          tableData={this.state.tableData}
          searchCondition={this.state.searchCondition}
          paginationData={this.state.paginationData}
          returnCurrent={(paginationData) => { this.setState({ paginationData }) }}
        />
      </div>
    )
  }
}
