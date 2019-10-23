import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';

class Annually extends Component {
  searchLimit = {
    search: [
      { component: 'EamilInputItem', name: 'courseName', label: '用户邮箱' },
      { component: 'BuildInputItem', name: 'build', label: 'BuildName' },
      { component: 'FuelType', name: 'FuelType', label: 'Fule类型' },
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
      title: 'Building Name',
      dataIndex: 'b',
      align: 'center',
      width: 80,
    }, {
      title: 'Fuel type',
      dataIndex: 'c',
      align: 'center',
      width: 80,
    }, {
      title: '2015',
      dataIndex: 'd',
      align: 'center',
      width: 80,
    }, {
      title: '2016',
      dataIndex: 'e',
      align: 'center',
      width: 80,
    }, {
      title: '2017',
      dataIndex: 'f',
      align: 'center',
      width: 80,
    }, {
      title: '2018',
      dataIndex: 'g',
      align: 'center',
      width: 80,
    }, {
      title: '2019',
      dataIndex: 'h',
      align: 'center',
      width: 80,
    }, {
      title: 'result',
      dataIndex: 'r',
      align: 'center',
      width: 80,
    }],
    url: '/user/selectAll'
  }



  render () {
    const { markId } = this.props;
    return (
      <div className="table-outer-message">
        <div className="title-tip">Annualy表:</div>
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
export default Annually;