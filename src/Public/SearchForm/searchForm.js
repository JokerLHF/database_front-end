import React, { Component } from 'react'
import { Form, Button, message } from 'antd';
import searchItem from './searchItem';
import _fetch from '../../Util/Fetch';
const FormItem = Form.Item;
class SearchForm extends Component {

  componentDidMount () {
    const { userForm } = this.props
    !userForm && this.getAllData(); // 如果没有这个标志就正常发送数据跟表单是一体的
  }

  getAllData = () => {
    const { searchLimit: { search, anotherSearch, url }, returnData, tablePaginationData } = this.props;
    let searchCondition = this.changeSearchTimeData(search);
    Object.keys(anotherSearch).forEach(item => { // anotherSearch的转换
      searchCondition[item] = anotherSearch[item]
    })
    searchCondition.current = tablePaginationData.current;
    searchCondition.pageSize = 10;
    const options = {
      url,
      data: searchCondition,
      type: 'post'
    }
    _fetch(options).then((response) => {
      let search = {};
      search.searchLimit = searchCondition;
      search.url = url;
      let tableData = response.data.records,
        paginationData = {
          total: response.data.total,
          current: tablePaginationData.current
        };
      returnData && returnData(tableData, search, paginationData)
    })
  }

  changeSearchTimeData = (searchList) => { // 把搜索条件换位key-value, 并且把数组的搜索条件分开
    let publicSearch = {};
    searchList.forEach(item => { // 搜索条件的转换
      let itemName = item.name;
      if (itemName instanceof Array) {
        itemName.forEach(arrayItemName => {
          publicSearch[arrayItemName] = '';
        })
      } else {
        publicSearch[itemName] = '';
      }
    })
    return publicSearch;
  }

  searchFunc = () => {
    const { searchLimit: { url, anotherSearch }, returnData, tablePaginationData, userForm } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        console.log(err);
        return;
      }
      let data = this.turnUndefinedToNull(values);
      Object.keys(anotherSearch).forEach(item => { // anotherSearch的转换
        data[item] = anotherSearch[item]
      })

      if (!userForm) { // 证明不是上面用户输入的, 就正常的发送分页数据 
        data.current = tablePaginationData.current;
        data.pageSize = 10;
      }


      const options = {
        url,
        data,
        type: 'post'
      }
      console.log(data);
      _fetch(options).then((response) => {
        if (!userForm) {
          let search = {};
          search.searchLimit = data;
          search.url = url;
          let tableData = response.data.records,
            paginationData = {
              total: response.data.total,
              current: tablePaginationData.current
            };
          returnData && returnData(tableData, search, paginationData)
        } else {
          if (response.data.code === 200) {
            message.success('操作成功')
          }
        }
      })
    })
  }

  renderFormItem = ({ component, name, label }) => { // 循环返回FormItem的函数
    const { form: { getFieldDecorator }, userForm } = this.props;
    let CompomentItem = searchItem[component];
    return (
      <FormItem key={name} label={label}>
        {
          getFieldDecorator(name, {})(
            !userForm ? <CompomentItem getAllDataFunc={this.searchFunc} /> : <CompomentItem />
          )}
      </FormItem>
    )
  }

  turnUndefinedToNull = (value) => { // 把一些值为undefined的变为空， 为了redux能够识别
    Object.keys(value).forEach(item => {
      if (value[item] === undefined || value[item] === null) {
        value[item] = '';
      }
    })
    return value;
  }

  render () {
    const { searchLimit: { search }, autoClass, searchButton } = this.props
    return (
      <Form layout="inline" className={autoClass ? autoClass + ' form-tip' : "search-form form-tip"}>
        {
          search.map(item => {
            return this.renderFormItem(item);
          })
        }
        {
          search && search.length === 0 ? null : (
            <FormItem>
              <Button type="primary" onClick={this.searchFunc} className="search-button"> {searchButton} </Button>
            </FormItem>
          )
        }
      </Form>
    )
  }
}

SearchForm = Form.create({})(SearchForm)
export default SearchForm;