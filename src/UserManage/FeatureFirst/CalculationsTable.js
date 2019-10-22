import React, { Component, Fragment } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';
import './index.less';
class Calculations extends Component {

  searchLimit = {
    search: [
      { component: 'EamilInputItem', name: 'courseName', label: '用户邮箱' },
      { component: 'CalculationsType', name: 'CalculationsType', label: 'Calculations' },
      { component: 'ActivityType', name: 'activity', label: 'Activity' },
    ],
    anotherSearch: {},
    url: '/user/selectAll',
  }


  tableLimit = {
    columns: [{
      title: '用户邮箱',
      dataIndex: 'a',
      align: 'center',
      width: 150,
    }, {
      title: 'Calculations',
      dataIndex: 'a',
      align: 'center',
      width: 150,
    }, {
      title: 'Activity',
      dataIndex: 'a',
      align: 'center',
      width: 150,
    }, {
      title: 'Fuel',
      dataIndex: 'b',
      align: 'center',
      width: 150,
    }, {
      title: 'kg CO2e',
      dataIndex: 'b',
      align: 'center',
      width: 150,
    }, {
      title: 'kg CO2',
      dataIndex: 'c',
      align: 'center',
      width: 150,
    }, {
      title: 'kg CH4',
      dataIndex: 'd',
      align: 'center',
      width: 150,
    }, {
      title: 'kg N2O',
      dataIndex: 'e',
      align: 'center',
    }],
    url: '/user/selectAll'
  }

  render () {
    return (
      <div className="table-outer-message">
        <div className="title-tip">Calculations表:</div>
        <SearchForm
          searchLimit={this.searchLimit}
          markId='3'   // 因为一个路由有有多个表格, 方便在存储的时候区分。 【在改路由下唯一】
        />
        <TableData
          tableLimit={this.tableLimit}
          markId='3'
        />
      </div>
    )
  }
}
export default Calculations;