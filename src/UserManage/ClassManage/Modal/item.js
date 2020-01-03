import React, { Component } from 'react';
import _fetch from '../../../Util/Fetch';

import { Form, Input, Select, Button } from 'antd';
const { Option } = Select;

export class GradeList extends Component {
  state = {
    list: [],
    currency: '',
  }
  componentDidMount() {
    let options = {
      url: '/api/grade/getDetailGrade',
      type: 'post',
      data: {}
    }
    _fetch(options).then(res => {
      if(res.errno === 0) {
        this.setState({list: res.data.records}, () => {
          if(this.props.initVal !== '') {
            this.handleCurrencyChange(this.props.initVal);
          }
        })
      }
    })
  }

  handleCurrencyChange = currency => {
    this.setState({ currency });
    this.triggerChange({ currency });
  };

  triggerChange = (changedValue) => { // antd组件返回给form，可以通过 this.props.form.validateFields 拿到值
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state.currency, changedValue).currency);
    }
  }

  render() {
    return(
       <Select
          value={this.state.currency}
          onChange={this.handleCurrencyChange}
        >
          {
            this.state.list.map((item, index) => {
              return (<Option value={item.id} key={index}>{item.grade_name}</Option>)
            })
          }
        </Select>
    )
  }
}





export class DepartmentList extends Component {
  state = {
    list: [],
    currency: '',
  }
  componentDidMount() {
    let options = {
      url: '/api/department/getDetailDepartment',
      type: 'post',
      data: {}
    }
    _fetch(options).then(res => {
      if(res.errno === 0) {
        this.setState({list: res.data.records}, () => {
          if(this.props.initVal !== '') {
              this.handleCurrencyChange(this.props.initVal);
          }
        })
      }
    })
  }

  handleCurrencyChange = currency => {
    this.setState({ currency });
    this.triggerChange({ currency });
  };

  triggerChange = (changedValue) => { // antd组件返回给form，可以通过 this.props.form.validateFields 拿到值
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state.currency, changedValue).currency);
    }
  }

  render() {
    return(
       <Select
          value={this.state.currency}
          onChange={this.handleCurrencyChange}
        >
          {
            this.state.list.map((item, index) => {
              return (<Option value={item.id} key={index}>{item.department_name}</Option>)
            })
          }
        </Select>
    )
  }
}
