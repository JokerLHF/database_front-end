import React, { Component, Fragment } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';
import './index.less';
class UserMessage extends Component {

  searchLimit = {
    search: [
      // { component: 'School', name: 'schoolId', label: '学校' },
      // { component: 'SearchInputItem', name: 'courseName', label: '课程' },
      // { component: 'SearchDatePickerItem', name: 'time', label: '时间' },
    ],
    anotherSearch: {},
    url: '/user/selectAll',
  }


  tableLimit = {
    columns: [{
      title: '用户x',
      dataIndex: 'a',
      align: 'center',
      width: 150,
    }, {
      title: '用户邮箱',
      dataIndex: 'b',
      align: 'center',
    }],
    url: '/user/selectAll'
  }

  render () {
    const { markId } = this.props;
    return (
      <div className="table-outer-message">
        <div className="title-tip">用户信息表:</div>
        <SearchForm
          searchLimit={this.searchLimit}
          markId={markId}   // 因为一个路由有有多个表格, 方便在存储的时候区分。 【在改路由下唯一】
        />
        <TableData
          tableLimit={this.tableLimit}
          markId={markId}
        />
      </div>
    )
  }
}
export default UserMessage;