import React, { Component } from 'react';
import SearchForm from '../../Public/SearchForm';
import TableData from '../../Public/TableData';

class HistoryLibrary extends Component {

  searchLimit = {
    search: [
      { component: 'InputItem', name: 'keywords', label: '关键字搜索' },
    ],
    anotherSearch: {},
    ajaxConfig: {
      url: '/api/history-library/getHistoryDetail',
      type: 'post',
    }
  }
  tableLimit = {
    columns: [{
      title: '学号',
      dataIndex: 'student_id',
      align: 'center',
    }, {
      title: '姓名',
      dataIndex: 'student_name',
      align: 'center',
    }, {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
    }, {
      title: '出生日期',
      dataIndex: 'born_day',
      align: 'center',
    }, {
      title: '入学成绩',
      dataIndex: 'admission_grade',
      align: 'center',
    }, {
      title: '院系',
      dataIndex: 'department_name',
      align: 'center',
    }, {
      title: '年级',
      dataIndex: 'grade_name',
      align: 'center',
    }, {
      title: '班级',
      dataIndex: 'class_name',
      align: 'center',
    }, {
      title: '原由',
      dataIndex: 'leave_type',
      align: 'center',
      render: (text) => {
        return(<span>{text == 1 ? '退学': '毕业'}</span>)
      }
    }],
    ajaxConfig: {
      url: '/api/history-library/getHistoryDetail',
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
export default HistoryLibrary;