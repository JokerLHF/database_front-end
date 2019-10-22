import React, { Component, Fragment, } from 'react';
import ChangeMessageCom from './ChangeMessageCom';
class ChangeMessage extends Component {

  tableForm1 = {
    thead: '基本信息更改',
    th: ['kgCO2e碳排放', '价格', '操作'],
    tdList: [{ name: 'ko2' }, { name: 'price' }]
  }
  tableForm2 = {
    thead: 'Calculations页面更改',
    th: ['type', 'kg CO2e', 'kg CO2', 'kg CH4', 'kg N2O', '操作'],
    tdList: [{ name: 'type', type: 'select' }, { name: 'kg CO2e' }, { name: 'kg CO2' }, { name: 'kg CH4' }, { 'name': 'kg N2O' }]
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