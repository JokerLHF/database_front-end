import React, { Component } from 'react'
import { Table } from 'antd';
import _fetch from '../../Util/Fetch';
import './tableData.less'
export default class TableData extends Component {
  state = {
    tableData: [],
    loading: true,
    pagination: { // 分页的部分定死的数据
      total: 0,
      current: 1,
      pageSize: 10, // 10条数据
      onChange: (pageNumber) => {
        this.getAllData(pageNumber); // 根据搜索条件获取table的数据
      },
      showTotal: () => { // 当前页和一页渲染的总数都放在redux里面
        const { current, pageSize, total } = this.state.pagination;
        return `显示 ${(current - 1) * pageSize + 1} - ${current * pageSize} 条 ， 共  ${total} 条`
      },
    },
  }
  innerConst = {
    windowScreenHeight: 0
  }
  componentDidMount () {
    let screenHeight = document.getElementsByClassName('search-form-table-div')[0].offsetHeight - 250;
    this.innerConst.windowScreenHeight = screenHeight;
    // window.addEventListener('resize', this.handleHeight);
  }
  // handleHeight = () => {

  // }
  getAllData = (pageNumber) => {
    const { searchCondition: { searchLimit, url }, returnCurrent } = this.props;
    let pagination = Object.assign({}, this.state.pagination, { current: pageNumber });
    this.setState({ pagination, loading: true });
    searchLimit.current = pageNumber;
    const options = {
      url,
      data: searchLimit,
      type: 'post'
    }
    _fetch(options).then(response => {
      this.setState({
        loading: false,
        tableData: response.data.records,
        total: response.data.total
      })
      returnCurrent({ current: pageNumber, total: response.data.total });
    })
  }



  componentWillReceiveProps (nextProps) {
    this.setState({ loading: true });
    if (this.props !== nextProps) {
      const { tableData, paginationData } = nextProps;
      let pagination = Object.assign({}, this.state.pagination, paginationData);
      this.setState({
        loading: false,
        tableData,
        pagination
      })
    }
  }

  render () {
    return (
      <Table
        className="base-table"
        bordered
        columns={this.props.columns}
        pagination={this.state.pagination}
        dataSource={this.state.tableData}
        loading={this.state.loading}
        rowKey={record => record.id}
        scroll={{ y: this.innerConst.windowScreenHeight }}
      />
    )
  }
}
