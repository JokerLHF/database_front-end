import React, { Component, } from 'react';
import ChangeMessageCom from './ChangeMessageCom';
class ChangeMessage extends Component {

  tableForm1 = {
    thead: '基本信息更改',
    th: ['Commodity', 'kgCO2e碳排放', '价格', '操作'],
    tdList: [{ name: 'commodity', type: 'Input' }, { name: 'co2Emission' }, { name: 'price' }],
    ajaxConfig: {
      url: '/carbonPrice/updateCarbonPriceParameters',
      type: 'post',
      ContentType: 'application/x-www-form-urlencoded'
    }
  }
  tableForm2 = {
    thead: 'Calculations页面更改',
    th: ['activity', 'fuel', 'unit', 'kg CO2e', 'kg CO2', 'kg CH4', 'kg N2O', '操作'],
    tdList: [{ name: 'activity', type: 'Input' }, { name: 'fuel', type: 'Input' }, { name: 'unit', type: 'Input' }, { name: 'kg CO2e' }, { name: 'kg CO2' }, { name: 'kg CH4' }, { 'name': 'kg N2O' }],
    ajaxConfig: {
      url: '/carbonPrice/updateAdvanceCalculationParameters',
      type: 'post',
      ContentType: 'application/x-www-form-urlencoded'
    }
  }
  render () {

    return (
      <div className="message-form-outer">
        <ChangeMessageCom
          tableForm={this.tableForm1}
        />
        <ChangeMessageCom
          tableForm={this.tableForm2}
        />
      </div>
    )
  }
}
export default ChangeMessage;