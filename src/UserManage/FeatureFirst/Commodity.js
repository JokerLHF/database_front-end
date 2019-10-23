import React, { Component, Fragment } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';
import './index.less';
class Commodity extends Component {

  searchLimit = {
    search: [
      { component: 'EamilInputItem', name: 'courseName', label: '用户邮箱' },
      { component: 'CommodityType', name: 'commodityType', label: '商品列表' },
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
      title: 'Commodity',
      dataIndex: 'b',
      align: 'center',
      width: 150,
    }, {
      title: '数值',
      dataIndex: 'c',
      align: 'center',
      width: 150,
    }, {
      title: 'KO2碳排放量',
      dataIndex: 'd',
      align: 'center',
      width: 150,
    }, {
      title: '价格',
      dataIndex: 'e',
      align: 'center',
    }],
    url: '/user/selectAll'
  }

  render () {
    const { markId } = this.props;
    return (
      <div className="table-outer-message">
        <div className="title-tip">商品价格表:</div>
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
export default Commodity;