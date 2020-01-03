import React, { Component } from 'react';
import _fetch from '../../../Util/Fetch';

import { Form, Input, Select, Button, Cascader  } from 'antd';
const { Option } = Select;

export class DepartGradeClazz extends Component {
  state = {
    list: [],
    currency: [],
  }
  componentDidMount() {
    let options = { url: '/api/class/getCasDepatGradeClazz', type: 'post', data: {} };
    // console.log(this.props)
    _fetch(options).then(res => {
      if(res.errno === 0) {
        this.setState({ list: res.data }, () => {
          // console.log(this.props.initVal);
          if(this.props.initVal.length) {
            this.handleCurrencyChange(this.props.initVal);
          }
        })
      }
    })

    // let promiseList = [ _fetch(departmentOptions), ]
  }

  handleCurrencyChange = currency => {
    console.log(currency);
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
      <Cascader 
        value={this.state.currency}
        options={this.state.list} 
        onChange={this.handleCurrencyChange}
      />
    )
  }
}



