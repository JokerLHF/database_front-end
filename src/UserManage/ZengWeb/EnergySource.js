import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';
import Util from '../../Util/util';
class EnergySource extends Component {
  searchLimit = {
    search: [
      { component: 'EamilInputItem', name: 'email', label: 'email' },
      { component: 'EnergySourceInputItem', name: 'renewableEnergySource', label: 'renewableEnergySource' },
    ],
    anotherSearch: {},
    ajaxConfig: {
      url: '/renewableEnergy/getPvAndWindInput',
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
      title: 'Energy Source',
      dataIndex: 'renewableEnergySource',
      align: 'center',
    }, {
      title: 'Capacity',
      dataIndex: 'capacity',
      align: 'center',
    }, {
      title: 'years',
      dataIndex: 'year',
      align: 'center',
    }, {
      title: 'Estimated Post Correction production',
      dataIndex: 'estimatedPostCorrectionProduction',
      align: 'center',
    }, {
      title: 'Correction factor',
      dataIndex: 'correctionFactor',
      align: 'center',
    }, {
      title: 'Estimated production',
      dataIndex: 'estimatedProduction',
      align: 'center',
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
    ajaxConfig: {
      url: '/renewableEnergy/getPvAndWindInput',
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
        <div className="title-tip">EnergySource表:</div>
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
export default EnergySource;