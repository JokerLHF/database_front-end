import React, { Component } from 'react';
import _fetch from '../../../Util/Fetch';

import { Form, Input, Select, Button } from 'antd';
const { Option } = Select;

export class TeacherMultiple extends Component {
  state = {
    list: [],
    currency: [],
  }
  componentDidMount() {
    let options = {
      url: '/api/teacher/getTeacherDetail',
      type: 'post',
      data: {}
    }
    _fetch(options).then(res => {
      if(res.errno === 0) {
        this.setState({list: res.data.records}, () => {
          if(this.props.initVal.length) {
            this.handleCurrencyChange(this.props.initVal);
          }
        })
      }
    })
  }

  handleCurrencyChange = currency => {
    console.log(currency)
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
          mode="multiple"
        >
          {
            this.state.list.map((item, index) => {
              return (<Option value={item.id} key={index}>{item.teacher_name}</Option>)
            })
          }
        </Select>
    )
  }
}
