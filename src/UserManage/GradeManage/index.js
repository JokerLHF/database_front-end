import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';

class GradeManage extends Component {

  searchLimit = {
    search: [],
    anotherSearch: {},
    ajaxConfig: {
      url: '/api/grade/getDetailGrade',
      type: 'post',
    }
  }
  tableLimit = {
    columns: [{
      title: '年级id',
      dataIndex: 'id',
      align: 'center',
    }, {
      title: '年级名称',
      dataIndex: 'grade_name',
      align: 'center',
    }],
    ajaxConfig: {
      url: '/api/grade/getDetailGrade',
      type: 'post',
    }
  }

  render() {
    return(
      <div className="department-div">
        <SearchForm
          searchLimit={this.searchLimit}
        />
        <TableData
          tableLimit={this.tableLimit}
        />
      </div>
    )
  }
}
export default GradeManage;