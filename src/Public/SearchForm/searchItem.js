import React, { Component, useState, forwardRef } from 'react';
import { Select, Input, DatePicker, InputNumber } from 'antd';
import './index.less';
const Option = Select.Option
const { RangePicker } = DatePicker






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


const InputItem = forwardRef(functionComponent(constant.INPUT_ITEM, '')); // Input




export default {
  InputItem,
}