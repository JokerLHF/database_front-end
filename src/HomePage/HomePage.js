import React, { Component } from 'react';
import SearchForm from '../Public/SearchForm/searchForm';
import TableData from '../Public/TableData/index';
import UserInformation from '../UserInformation/index';
import _fetch from '../Util/Fetch'
import store from '../Store/index';
import './HomePage.less';
export default class HomePage extends Component {

  state = {
    tableData: [], // table表格的数据
    searchCondition: {}, // 搜索条件
    paginationData: { current: 1, total: 0 }, // 分页的对象数据, total, current
  }

  searchLimit = {
    search: [ // 搜索框需要展示什么类型, 【注意，这里的name同时也是table获取全部数据发送给后台的字段名】
      { component: 'School', name: 'schoolId', label: '学校' },
      { component: 'SearchInputItem', name: 'courseName', label: '课程' },
      { component: 'SearchDatePickerItem', name: 'time', label: '时间' },
    ],
    anotherSearch: { id: store.getState().userMessage.id }, // 一些额外的搜索条件, eg: 不是搜索框的数据,没有的话传一个 {}
    url: '/course',
  }

  userSearchLimit = {
    search: [ // 搜索框需要展示什么类型, 【注意，这里的name同时也是table获取全部数据发送给后台的字段名】
      { component: 'School', name: 'xxx', label: '某某某' },
      { component: 'FormYear', name: 'year', label: '年份' },
      { component: 'FormCO', name: 'co', label: '二氧化碳' },
      { component: 'FormElect', name: 'elect', label: '电' },
    ],
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
      <div className="manage-div">
        <div className="user-form">
          <div className="inner-user-form">
            <span className="user-form-title">输入建筑信息</span>
            <SearchForm
              searchLimit={this.userSearchLimit}
              userForm={true} // 用来标识是用户输入的信息表单
              autoClass="user-searchForm" // 自定义类名
              searchButton="提交" // 按钮的名称
            />
          </div>
        </div>
        <div className="search-form-table-div searh-form-tip">
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
        <div className="user-information">
          <UserInformation />
        </div>
      </div>
    )
  }
}
