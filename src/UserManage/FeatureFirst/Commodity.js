import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';
import Util from '../../Util/util';
import './index.less';
class Commodity extends Component {

  searchLimit = {
    search: [
      { component: 'EamilInputItem', name: 'email', label: '用户邮箱' },
      { component: 'CommodityType', name: 'commodity', label: '商品列表' },
    ],
    anotherSearch: {},
    ajaxConfig: {
      url: '/carbonPrice/getCarbonPricePageInput',
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
      title: 'Commodity',
      dataIndex: 'commodity',
      align: 'center',
    }, {
      title: '数值',
      dataIndex: 'value',
      align: 'center',
    }, {
      title: 'KO2碳排放量',
      dataIndex: 'co2Emission',
      align: 'center',
    }, {
      title: '价格',
      dataIndex: 'price',
      align: 'center',
    }, {
      title: 'unit',
      dataIndex: 'unit',
      align: 'center',
    }],
    ajaxConfig: {
      url: '/carbonPrice/getCarbonPricePageInput',
      type: 'post',
      ContentType: 'application/x-www-form-urlencoded'
    }
  }

  changeSearchLimit = (searchCondition) => {
    let condition = Util.deepCopy(searchCondition);
    const { current, size } = condition;
    condition.pageNum = current;
    size && (condition.pageSize = size);
    delete condition.current;
    size && (delete condition.size);
    this.changeKongToNull(condition);
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
        <div className="title-tip">商品价格表:</div>
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
export default Commodity;