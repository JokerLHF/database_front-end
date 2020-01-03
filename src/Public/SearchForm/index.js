
import React, { Component } from 'react'
import { Form, Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { searchLimitAndResData, changeCurrent, loadingChange } from '../../Store/actionCreator';
import searchItem from './searchItem';
import _fetch from '../../Util/Fetch';
const FormItem = Form.Item;

class SearchForm extends Component {
  componentDidMount () {
    const { history: { location: { pathname } }, allTableData, } = this.props;
    let path = pathname;
    this.innerPath = path;
    !allTableData[path] && this.getAllData();  // 如果以及有数据就切换路由的时候就不用重新获取数据
    this.props.returnGetAllData && this.props.returnGetAllData(this.getAllData);
  }
  getAllData = () => { // 获取全部表格数据
    const { searchLimit: { search, anotherSearch, ajaxConfig: { url, type = 'post', ContentType = 'application/x-www-form-urlencoded' } }, changeSearchLimit } = this.props;
    let dataObj = {};
    search.length && this.dealSearch(dataObj, search);
    Object.keys(anotherSearch).length && this.dealAnotherSearch(dataObj, anotherSearch);
    this.dealWithpagination(dataObj);

    if (changeSearchLimit) {
      dataObj = changeSearchLimit(dataObj);
    }

    const options = {
      url,
      data: dataObj,
      type,
      headers: { 'Content-Type': ContentType }
    }


    _fetch(options).then(res => {
      // console.log(res);
      let records = [], total = 0;
      let data = res.data;
      if (data) { // 如果data不是空
        records = data.records;
        total = data.total;
      }
      const { searchLimitRes, fixedConf: { current }, changeCurrent, changeLoading, filterResData } = this.props;
      let resData = filterResData ? filterResData(records) : records;  // 过滤返回res的data
      changeLoading(this.innerPath, false);    // 顺序最好不要颠倒， 因为后面table在判断的时候会下判断loading在判断tableData。 不过颠倒也没错
      searchLimitRes(this.innerPath, dataObj, resData, total);
      changeCurrent(this.innerPath, current);  // 为每一个表确定一个初始的current
    })
  }

  dealSearch = (dataObj, search) => { // 处理search的搜索条件
    search.forEach(item => {
      dataObj[item.name] = '';
    })
  }
  dealAnotherSearch = (dataObj, anotherSearch) => { // 处理anotherSearch的搜索条件
    Object.assign(dataObj, dataObj, anotherSearch);
  }

  dealWithpagination = (dataObj) => { // 加上分页搜索条件
    const fixedConf = this.props.fixedConf;
    Object.assign(dataObj, dataObj, fixedConf);
  }



  searchFunc = () => { // 点击搜索
    const { form: { validateFields }, searchLimitRes, changeLoading, filterResData, changeSearchLimit } = this.props;
    const { ajaxConfig: { url, type = 'post', ContentType = 'application/x-www-form-urlencoded' } } = this.props.searchLimit;
    changeLoading(this.innerPath, true);
    validateFields((err, values) => {
      if (!!err) {
        console.log(err);
        return;
      }
      let dataVal = this.addPainationLimit(this.turnUndefinedToNull(values));

      if (changeSearchLimit) {
        dataVal = changeSearchLimit(dataVal);
      }

      const options = {
        url,
        data: dataVal,
        type,
        headers: { 'Content-Type': ContentType }
      }
      // console.log(options);
      _fetch(options).then(res => {

        let records = [], total = 0;
        let data = res.data;
        if (data) { // 如果data不是空
          records = data.records;
          total = data.total;
        }

        changeLoading(this.innerPath, false);
        let resData = filterResData ? filterResData(records) : records;
        searchLimitRes(this.innerPath, dataVal, resData, total);
      })
    });
  }

  turnUndefinedToNull = (value) => { // 把一些值为undefined的变为空， 为了redux能够识别
    Object.keys(value).forEach(item => {
      if (value[item] === undefined || value[item] === null) {
        value[item] = '';
      }
    })
    return value;
  }
  addPainationLimit = (dataVal) => { // 点击搜索的时候增加分页条件
    const { fixedConf, allTableData } = this.props;
    dataVal.current = allTableData[this.innerPath].current;
    dataVal.size = fixedConf.size;
    return dataVal;
  }





  renderForm = () => {
    const { searchLimit: { search } } = this.props;
    let domList = [];
    if (search.length) { // 如果有搜索的formItem
      domList.push(this.returnFormItem());
      domList.push(this.returnSumbitBtn())
    }
    return domList;
  }
  returnFormItem = () => {  // 返回formItem 
    const { form: { getFieldDecorator }, searchLimit: { search } } = this.props;
    return search.map(item => {
      const { name, label, component } = item;
      let CompomentItem = searchItem[component];
      return (
        <FormItem key={name} label={label}>
          {
            getFieldDecorator(name)(
              <CompomentItem />
            )
          }
        </FormItem>
      )
    })
  }
  returnSumbitBtn = () => { // 返回上传的按钮
    return (
      <FormItem key="1008611">
        <Button type="primary" onClick={this.searchFunc} className="search-button"> 搜索 </Button>
      </FormItem>
    )
  }

  render () {
    return (
      <Form layout="inline" className={'form-tip'}>
        {this.renderForm()}
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fixedConf: state.fixedConf,
    allTableData: state.allTableData,
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

SearchForm = Form.create({})(SearchForm)
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchForm));
