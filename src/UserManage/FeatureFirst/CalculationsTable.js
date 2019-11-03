import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';
import Util from '../../Util/util';
import './index.less';
class Calculations extends Component {

  searchLimit = {
    search: [
      { component: 'EamilInputItem', name: 'email', label: '用户邮箱' },
      { component: 'FuelInputItem', name: 'fuel', label: 'FuelType' },
      { component: 'ActivityType', name: 'activity', label: 'Activity' },
    ],
    anotherSearch: {},

    ajaxConfig: {
      url: '/carbonPrice/getAvdanceCalculationInputPage',
      type: 'post',
      ContentType: 'application/x-www-form-urlencoded'
    }
  }


  tableLimit = {
    columns: [{
      title: 'email',
      dataIndex: 'email',
      align: 'center',
    }, {
      title: 'activity',
      dataIndex: 'activity',
      align: 'center',
    }, {
      title: 'fuel',
      dataIndex: 'fuel',
      align: 'center',
    }, {
      title: 'kg CO2e',
      dataIndex: 'co2e',
      align: 'center',
    }, {
      title: 'kg CO2',
      dataIndex: 'co2',
      align: 'center',
    }, {
      title: 'kg CH4',
      dataIndex: 'ch4',
      align: 'center',
    }, {
      title: 'kg N2O',
      dataIndex: 'n2o',
      align: 'center',
    }],
    ajaxConfig: {
      url: '/carbonPrice/getAvdanceCalculationInputPage',
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
    this.changeKongToNull(condition);
    console.log(condition);
    return condition;
  }

  changeKongToNull = (condition) => {  // 把'' 的去掉， 因为后台接口需要这么做
    Object.keys(condition).forEach(key => {
      if (condition[key] === '') {
        delete condition[key];
      }
    })
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
        <div className="title-tip">Calculations表:</div>
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
export default Calculations;