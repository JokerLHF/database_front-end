import React, { Component, useState, useEffect, forwardRef } from 'react'
import { Select, Input, DatePicker, InputNumber } from 'antd'
import _fetch from '../../Util/Fetch'
import './index.less'
const Option = Select.Option
const { RangePicker } = DatePicker


/*
* url: 发送的接口名称
* data: 发送的数据
* ajaxType: 发送的类型, 默认是post, 默认可以不传
* headerType: 头部信息, 默认是json发送, json可以不传
*/
const HighComponent = (isNeedAjax, url, data, ajaxType, headerType) => (WrappedComponent) => { // 第一个参数接收请求的url， 第二个参数是组件, 类组件经过这个组件提供onChange
  return class extends Component {
    state = {
      list: [],
      currency: ''
    }
    componentDidMount () { // 使用HOc统一发送请求， 比如获取所以学校， 所有区域这些下拉框
      isNeedAjax && this.getAllData();
    }

    getAllData = () => {
      // const options = {
      //   type: ajaxType ? ajaxType : 'post',
      //   data,
      //   url,
      //   headers: {
      //     'Content-Type': headerType ? headerType : 'application/json'
      //   }
      // }
      // _fetch(options).then((response) => {
      //   this.setState({
      //     list: response.data,
      //   })
      // })
      //   this.setState({
      //     list: [{ id: 1, name: 'kkk' }, { id: 2, name: 'aaa' }]
      //   })
    }

    triggerChange = (changedValue) => {
      const onChange = this.props.onChange;
      if (onChange) {
        onChange(Object.assign({}, this.state.currency, changedValue).currency);
      }
    }

    handleCurrencyChange = (currency) => {
      this.setState({ currency });
      this.triggerChange({ currency });
      if (this.props.getAllDataFunc) {
        this.props.getAllDataFunc();
      }
    }

    render () {
      const newProps = {
        ...this.state,
        handleCurrencyChange: this.handleCurrencyChange
      }
      return (<WrappedComponent {...this.props} {...newProps} />)
    }
  }
}


class Commodity extends Component {
  commodityList = [
    { key: 'Electricity', value: 'Electricity' },
    { key: 'Gas', value: 'Gas' },
    { key: 'Water', value: 'Water' }
  ]
  render () {
    const { currency, handleCurrencyChange } = this.props
    return (
      <Select
        onChange={handleCurrencyChange}
        value={currency}
        className="search-select"
      >
        {
          this.commodityList.map((item, index) => (
            <Option value={item.key} key={index}>
              {item.value}
            </Option>
          ))
        }
      </Select>
    )
  }
}
const CommodityType = HighComponent({
  isNeedAjax: false,
})(Commodity);


class Calculations extends Component {
  calculationsList = [
    { key: 'Fules', value: 'Fules' },
    { key: 'Bioenergy', value: 'Bioenergy' },
    { key: 'Refrigerant', value: 'Refrigerant' },
    { key: 'Electricity', value: 'Electricity' },
    { key: 'Water', value: 'Water' }
  ]
  render () {
    const { currency, handleCurrencyChange } = this.props
    return (
      <Select
        onChange={handleCurrencyChange}
        value={currency}
        className="search-select"
      >
        {
          this.calculationsList.map((item, index) => (
            <Option value={item.key} key={index}>
              {item.value}
            </Option>
          ))
        }
      </Select>
    )
  }
}
const CalculationsType = HighComponent({
  isNeedAjax: false,
})(Calculations);



class Activity extends Component {
  calculationsList = [
    { key: 'Gaseous fuels', value: 'Gaseous fuels' },
    { key: 'Liquid fuels', value: 'Liquid fuels' },
    { key: 'Solid fuels', value: 'Solid fuels' },
    { key: 'Biofuel', value: 'Biofuel' },
    { key: 'Biomass', value: 'Biomass' },
    { key: 'Biogas', value: 'Biogas' },
    { key: 'Kyoto protocol - standard', value: 'Kyoto protocol - standard' },
    { key: 'Kyoto protocol- blends', value: 'Kyoto protocol- blends' },
    { key: 'Montreal protocol - standard', value: 'Montreal protocol - standard' },
    { key: 'Other perfluorinated gases', value: 'Other perfluorinated gases' },
    { key: 'Fluorinated ethers', value: 'Fluorinated ethers' },
    { key: 'Other refrigerants', value: 'Other refrigerants' },
    { key: 'Montreal protocol - blends', value: 'Montreal protocol - blends' },
    { key: 'Electricity generated', value: 'Electricity generated' },
    { key: 'Water supply', value: 'Water supply' },
    { key: 'Water treatment', value: 'Water treatment' },
  ]
  render () {
    const { currency, handleCurrencyChange } = this.props
    return (
      <Select
        onChange={handleCurrencyChange}
        value={currency}
        className="search-select"
      >
        {
          this.calculationsList.map((item, index) => (
            <Option value={item.key} key={index} title={item.key}>
              {item.value}
            </Option>
          ))
        }
      </Select>
    )
  }
}
const ActivityType = HighComponent({
  isNeedAjax: false,
})(Activity);








const constant = {
  INPUT_ITEM: 1, // input框的标识
  INPUTNUMBER_ITEM: 4, // inputNumber的标识
  DATA_PICKER: 2, // 时间单选框的标识
  RANGE_PICKER: 3, // 时间多选框的标识
}

let functionComponent = (identification, holder, formatTime) => { // 第一个时标识， 第二个是placeholder, 第三个是时间转换的格式 'YYYY-MM-DD'
  return ({ onChange }, ref) => {
    const [currency, setCurrency] = useState(null)
    const triggerChange = (changedValue) => {
      if (onChange) {
        onChange(Object.assign({}, { currency }, changedValue).currency);
      }
    }

    switch (identification) {
      case constant.INPUT_ITEM:
        return (
          <Input
            ref={ref}
            placeholder={holder}
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value)
              triggerChange({ currency: e.target.value })
            }}
            className="search-input"
          />
        );
      case constant.DATA_PICKER:
        return (
          <DatePicker
            ref={ref}
            value={currency}
            placeholder={holder}
            onChange={(e) => {
              setCurrency(e)
              let time = (e === null ? null : e.format(formatTime));
              triggerChange({ currency: time });
            }}
            className="search-data-picker"
          />
        );
      case constant.RANGE_PICKER:
        return (
          <RangePicker
            ref={ref}
            value={currency}
            placeholder={holder}
            onChange={(e) => {
              let timeArray = [];
              e.forEach(item => {
                timeArray.push(item.format(formatTime))
              })
              setCurrency(e);
              triggerChange({ currency: timeArray }) // 多选的值是以数组的形式返回值 eg: ["2019-06-04", "2019-06-05"]
            }}
            className="search-range-picker"
          />
        );
      case constant.INPUTNUMBER_ITEM:
        return (
          <InputNumber
            ref={ref}
            value={currency}
            onChange={(value) => {
              setCurrency(value);
              triggerChange({ currency: value });
            }}
            className="search-inputNumber"
          />
        );
      default:
        return null;
    }
  }
}

const EamilInputItem = forwardRef(functionComponent(constant.INPUT_ITEM, '邮箱')); // Input

// const SearchDatePickerItem = forwardRef(functionComponent(constant.DATA_PICKER, '选择时间', 'YYYY-MM-DD')); // 单选的时间框
// const SearchRangePickerItem = forwardRef(functionComponent(constant.RANGE_PICKER, ['开始时间', '结束时间'], 'YYYY-MM-DD')); // 多选的时间框





export default {
  CommodityType,
  CalculationsType,
  ActivityType,
  EamilInputItem,
}