import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';
import Util from '../../Util/util';
class Annually extends Component {
  searchLimit = {
    search: [
      { component: 'EamilInputItem', name: 'userEmail', label: '用户邮箱' },
      { component: 'BuildInputItem', name: 'buildingName', label: 'BuildName' },
      { component: 'FuelType', name: 'fuelType', label: 'Fule类型' },
    ],
    anotherSearch: {},
    ajaxConfig: {
      url: '/userBuildingInfo/selectAnnuallyBuildingInfoVos',
      type: 'post',
      ContentType: 'application/x-www-form-urlencoded'
    }
  }

  tableLimit = {
    columns: [{
      title: '用户邮箱',
      dataIndex: 'userEmail',
      align: 'center',
    }, {
      title: 'buildingName',
      dataIndex: 'buildingName',
      align: 'center',
    }, {
      title: 'Fuel type',
      dataIndex: 'fuelType',
      align: 'center',
      width: 80,
    }, {
      title: '2015',
      dataIndex: '2015',
      align: 'center',
      width: 80,
    }, {
      title: '2016',
      dataIndex: '2016',
      align: 'center',
      width: 80,
    }, {
      title: '2017',
      dataIndex: '2017',
      align: 'center',
      width: 80,
    }, {
      title: '2018',
      dataIndex: '2018',
      align: 'center',
      width: 80,
    }, {
      title: '2019',
      dataIndex: '2019',
      align: 'center',
      width: 80,
    }, {
      title: 'result',
      dataIndex: 'result',
      align: 'center',
    }],
    ajaxConfig: {
      url: '/userBuildingInfo/selectAnnuallyBuildingInfoVos',
      type: 'post',
      ContentType: 'application/x-www-form-urlencoded'
    }
  }

  changeSearchLimit = (searchCondition) => {
    let condition = Util.deepCopy(searchCondition);
    const { current, size } = condition;
    current && (condition.currentPage = current);
    delete condition.current;
    console.log(condition);
    return condition;
  }

  filterResData = (resData) => {
    console.log(resData);
    resData.forEach(item => {
      let yearList = item.annuallyInfos;
      yearList.forEach(yearItem => {
        const { year, result } = yearItem;
        item[year] = result;
      })
    })
    console.log(resData);
    return resData;
  }


  render () {
    const { markId } = this.props;
    return (
      <div className="table-outer-message">
        <div className="title-tip">Annualy表:</div>
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
export default Annually;