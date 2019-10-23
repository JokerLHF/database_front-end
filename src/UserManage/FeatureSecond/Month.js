import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';

class Month extends Component {
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
    }],
    url: '/user/selectAll'
  }


  filterResData = (resData) => { // 过滤将后台的数据转换为前端需要的数据格式
    console.log(resData);
    return resData;
  }

  judgeColumnHas = ({ columns }, titleList) => { // 判断是否出现2018 2019字段
    for (let i = 0; i < columns.length; i++) {
      let item = columns[i];
      if (titleList.indexOf(parseInt(item.title)) !== -1) {
        return true;
      }
    }
    return false;
  }

  addColumn = (tableLimit) => {
    let titleList = [2018, 2019];
    let res = this.judgeColumnHas(tableLimit, titleList); // 判断是否在columns加过依次字段
    if (!res) {
      let resName = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']; // 后台每一个月的字段名
      const { columns } = tableLimit;
      for (let i = 0; i < titleList.length; i++) {
        let titleName = titleList[i];  // 2018, 2019
        let obj = { title: titleName, children: [] };
        for (let j = 0; j < resName.length; j++) {
          let secTitleName = resName[j];  // january february ....
          let child = { title: secTitleName, dataIndex: `${titleName}-${secTitleName}`, align: 'center', width: 80 }
          obj.children.push(child);
        }
        columns.push(obj);
      }
    }
    return tableLimit;
  }

  render () {
    const { markId } = this.props;
    let tableLimit = this.addColumn(this.tableLimit);
    return (
      <div className="table-outer-message">
        <div className="title-tip">Month表:</div>
        <SearchForm
          searchLimit={this.searchLimit}
          markId={markId}   // 因为一个路由有有多个表格, 方便在存储的时候区分。 【在改路由下唯一】
          filterResData={this.filterResData}   // 编辑后台的数据
        />
        <TableData
          tableLimit={tableLimit}
          markId={markId}
          filterResData={this.filterResData} // 编辑后台返回的数据
        />
      </div>
    )
  }
}
export default Month;