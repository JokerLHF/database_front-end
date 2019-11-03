import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';
import Util from '../../Util/util';
import './index.less';
class CalculationUser extends Component {

  searchLimit = {
    search: [],
    anotherSearch: {},
    ajaxConfig: {
      url: '/carbonPrice/getAdvanceCalculationUser',
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
      url: '/carbonPrice/getAdvanceCalculationUser',
      type: 'post',
      ContentType: 'application/x-www-form-urlencoded'
    }
  }

  changeSearchLimit = (searchCondition) => {
    let condition = Util.deepCopy(searchCondition);
    const { current, size } = condition;
    current && (condition.pageNum = current);
    size && (condition.pageSize = size);
    current && (delete condition.current);
    size && (delete condition.size);
    return condition;
  }
  filterResData = (resData) => {
    resData.forEach((item, index) => {
      item.id = index;
    })
    return resData;
  }
  render () {
    const { markId } = this.props;
    return (
      <div className="table-outer-message">
        <div className="title-tip">CalculationUser信息表:</div>
        <SearchForm
          searchLimit={this.searchLimit}
          markId={markId}   // 因为一个路由有有多个表格, 方便在存储的时候区分。 【在改路由下唯一】
          changeSearchLimit={this.changeSearchLimit}
          filterResData={this.filterResData}
        />
        <TableData
          tableLimit={this.tableLimit}
          markId={markId}
          changeSearchLimit={this.changeSearchLimit}
          filterResData={this.filterResData}
        />
      </div>
    )
  }
}
export default CalculationUser;