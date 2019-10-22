import React, { Component, Fragment } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';

class UserMessage extends Component {

  searchLimit = {
    search: [
      { component: 'School', name: 'schoolId', label: '学校' },
      { component: 'SearchInputItem', name: 'courseName', label: '课程' },
      { component: 'SearchDatePickerItem', name: 'time', label: '时间' },
    ],
    anotherSearch: {},
    url: '/user/selectAll',
  }


  tableLimit = {
    columns: [{
      title: '课程名称',
      dataIndex: 'a',
      align: 'center',
      width: 150,
    }, {
      title: '课程名称',
      dataIndex: 'b',
      align: 'center',
    }],
    url: '/user/selectAll'
  }

  render () {
    return (
      <Fragment>
        <SearchForm
          searchLimit={this.searchLimit}
          markId='1'   // 因为一个路由有有多个表格, 方便在存储的时候区分。 【在改路由下唯一】
        />
        <TableData
          tableLimit={this.tableLimit}
          markId='1'
        />
      </Fragment>
    )
  }
}
export default UserMessage;