import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export class MySelect extends Component {
  state = {
    currency: 'Fules'
  }
  componentDidMount () {
    this.triggerChange({ currency: 'Fules' });
  }
  handleCurrencyChange = currency => {
    this.setState({ currency });
    this.triggerChange({ currency });
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue.currency);
    }
  };
  render () {
    return (
      <Select
        onChange={this.handleCurrencyChange}
        value={this.state.currency}
        className="td-select"
      >
        <Option value="Fules">Fules</Option>
        <Option value="Bioenergy">Bioenergy</Option>
        <Option value="Refrigerant">Refrigerant</Option>
        <Option value="Electricity">Electricity</Option>
        <Option value="Water">Water</Option>
      </Select>
    )
  }
}








export class MyCommoditySelect extends Component {
  state = {
    currency: 'Fules'
  }
  componentDidMount () {
    this.triggerChange({ currency: 'Electricity' });
  }
  handleCurrencyChange = currency => {
    this.setState({ currency });
    this.triggerChange({ currency });
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue.currency);
    }
  };
  render () {
    return (
      <Select
        onChange={this.handleCurrencyChange}
        value={this.state.currency}
        className="td-select"
      >
        <Option value="Electricity">Electricity</Option>
        <Option value="Gas">Gas</Option>
        <Option value="Water">Water</Option>
      </Select>
    )
  }
}
