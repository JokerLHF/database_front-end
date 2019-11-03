import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';

import './index.less';
class UserMessage extends Component {

  searchLimit = {
    search: [],
    anotherSearch: {},
    ajaxConfig: {
      url: '/user/selectAll',
      type: 'post',
      ContentType: 'application/x-www-form-urlencoded'
    }
  }


  tableLimit = {
    columns: [{
      title: '用户邮箱',
      dataIndex: 'email',
      align: 'center',
    }, {
      title: '能源消耗',
      dataIndex: 'energyConsumption',
      align: 'center',
    }, {
      title: '建筑类型',
      dataIndex: 'buildingType',
      align: 'center',
    }, {
      title: '建筑面积',
      dataIndex: 'area',
      align: 'center',
    }, {
      title: '年份',
      dataIndex: 'year',
      align: 'center',
    }, {
      title: '时间',
      dataIndex: 'modifiedTime',
      align: 'center',
    }],
    ajaxConfig: {
      url: '/user/selectAll',
      type: 'post',
      ContentType: 'application/x-www-form-urlencoded'
    }
  }

  filterResData = (records) => {
    records.forEach(item => {
      const { modifiedTime } = item;
      if (modifiedTime) {
        item.modifiedTime = new Date(modifiedTime.replace('T', " ")).pattern("yyyy-MM-dd hh:mm:ss")
      }
    });
    // console.log(records);
    return records;
  }
  render () {
    const { markId } = this.props;
    return (
      <div className="table-outer-message">
        <div className="title-tip">用户信息表:</div>
        <SearchForm
          searchLimit={this.searchLimit}
          markId={markId}   // 因为一个路由有有多个表格, 方便在存储的时候区分。 【在改路由下唯一】
          filterResData={this.filterResData} // 过滤通过搜索条件获取到的数据
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