import React, { Component } from 'react'
import { Table } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _fetch from '../../Util/Fetch';
import { changeCurrent, searchLimitAndResData, loadingChange } from '../../Store/actionCreator';
import './tableData.less';

class TableData extends Component {

  constructor(props) { // 一开始把path变为全局变量。在constructor要使用props就必须super(props)
    super(props);
    const { history: { location: { pathname } }, } = this.props;
    let path = pathname;
    this.innerPath = path;
  }

  state = {
    selectedRowKeys: []
  }

  changeCurrentGetData = (current) => {
    const { allSearchLimit, searchLimitRes, changeLoading, filterResData, changeSearchLimit } = this.props;
    const { ajaxConfig: { url, type = 'post', ContentType = 'application/x-www-form-urlencoded' } } = this.props.tableLimit;

    let searchLimit = allSearchLimit[this.innerPath].searchLimit;

    let searchCondition = Object.assign({}, searchLimit, { current });

    if (changeSearchLimit) {
      searchCondition = changeSearchLimit(searchCondition);
    }

    console.log(searchCondition);

    const options = {
      url,
      data: searchCondition,
      type,
      headers: { 'Content-Type': ContentType }
    }


    _fetch(options).then(res => {
      let records = res.data.records;
      changeLoading(this.innerPath, false);
      let resData = filterResData ? filterResData(records) : records;  // 过滤返回res的data
      searchLimitRes(this.innerPath, searchCondition, resData, res.data.total);
    })

  }

  returnData = (allTableData) => { // 返回tableData
    let temp = allTableData[this.innerPath];
    return temp ? temp.tableData : [];  // 第一次没有数据所以展示空
  }
  isLoading = (allTableData) => { // 返回loading
    let temp = allTableData[this.innerPath];
    return temp ? temp.loading : true;
  }
  returnPagina = (allTableData) => { // 改变pagination
    let temp = allTableData[this.innerPath];
    if (temp && temp.total && temp.current) { // 确保temp存在并且有total字段和current字段
      const { total, current, } = temp;
      const { size } = this.props.fixedConf;
      let onChange = (pageNumber) => {
        const { changeCurrent, changeLoading } = this.props;
        changeLoading(this.innerPath, true);  // 改变loading
        changeCurrent(this.innerPath, pageNumber); // 改变current
        this.changeCurrentGetData(pageNumber); // 发送请求
      }
      let showTotal = () => {
        let start = (current - 1) * size + 1, end = current * size;
        end = (end > total) ? total : end;
        return `显示 ${start} - ${end} 条 ， 共  ${total} 条`
      }
      let pagination = {
        total,
        current,
        pageSize: size,
        onChange: onChange,
        showTotal: showTotal
      }
      return pagination;
    }
    return {};
  }
  onSelectedRowKeysChange = (selectedRowKeys) => {
    let key = selectedRowKeys.splice(0, 1);
    this.setState({ selectedRowKeys: key });
  }
  selectRow = (record) => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    selectedRowKeys.length = 0;
    selectedRowKeys.push(record.id)
    this.setState({ selectedRowKeys });
    this.props.selected && this.props.selected(record);
  }
  selectRadio = (record) => {
    this.selectRow(record)
  }
  render () {
    const { tableLimit: { columns }, allTableData } = this.props;
    let dataSource = this.returnData(allTableData);
    let loading = this.isLoading(allTableData);
    let pagination = this.returnPagina(allTableData);
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
      onSelect: this.selectRadio
    };
    return (
      <Table
        className="base-table"
        bordered
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={pagination}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => {
            this.selectRow(record);
          },
        })}
        rowKey={record => record.id}
        scroll={{ x: true }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allTableData: state.allTableData,
    fixedConf: state.fixedConf,
    allSearchLimit: state.allSearchLimit
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    searchLimitRes (path, searchLimit, tableData, total) {
      let action = searchLimitAndResData(path, searchLimit, tableData, total);
      dispatch(action);
    },
    changeCurrent (path, current) {
      let action = changeCurrent(path, current);
      dispatch(action);
    },
    changeLoading (path, loading) {
      let action = loadingChange(path, loading)
      dispatch(action);
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableData));