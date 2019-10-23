import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';

class EnergySource extends Component {
  searchLimit = {
    search: [
      { component: 'EamilInputItem', name: 'courseName', label: '用户邮箱' },
      { component: 'SourceType', name: 'build', label: 'SourceType' },
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
      title: 'Energy Source',
      dataIndex: 'b',
      align: 'center',
      width: 80,
    }, {
      title: 'Capacity',
      dataIndex: 'c',
      align: 'center',
      width: 80,
    }, {
      title: 'years',
      dataIndex: 'd',
      align: 'center',
      width: 80,
    }, {
      title: 'Estimated production',
      dataIndex: 'e',
      align: 'center',
      width: 80,
    }, {
      title: 'Correction factor',
      dataIndex: 'f',
      align: 'center',
      width: 80,
    }, {
      title: 'Correction production',
      dataIndex: 'g',
      align: 'center',
      width: 80,
    }, {
      title: 'file',
      dataIndex: 'h',
      align: 'center',
      width: 80,
      render: (record) => {
        return (
          <a>下载</a>
        )
      }
    }],
    url: '/user/selectAll'
  }



  render () {
    const { markId } = this.props;
    return (
      <div className="table-outer-message">
        <div className="title-tip">EnergySource表:</div>
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
export default EnergySource;