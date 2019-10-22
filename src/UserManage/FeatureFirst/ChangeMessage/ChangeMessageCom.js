import React, { Component } from 'react';
import { Form, InputNumber, Button } from 'antd';
import MySelect from './SelectType';
const FormItem = Form.Item;

class ChangeMessageCom extends Component {
  sumbit = () => {
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        return;
      }
      console.log(values);
    })
  }

  renderTh = () => {
    const { tableForm: { th } } = this.props;
    return th.map(item => (
      <th key={item}>{item}</th>
    ))
  }

  renderTd = () => {
    const { tableForm: { tdList }, form: { getFieldDecorator } } = this.props;
    return tdList.map(item => {
      const { type, name } = item;
      if (!type) {
        return (<td key={name}> <FormItem>{getFieldDecorator(name)(<InputNumber min={0} className="td-input" />)}</FormItem> </td>)
      } else {
        return (<td key={name}> <FormItem>{getFieldDecorator(name)(<MySelect />)}</FormItem> </td>)
      }
    })
  }

  render () {
    return (
      <Form className="message-form">
        <table className="table-block">
          <caption className="table-caption">{this.props.tableForm.thead}</caption>
          <tbody>
            <tr>
              {this.renderTh()}
            </tr>
            <tr>
              {this.renderTd()}
              <td> <Button onClick={this.sumbit} className="sumbit-btn">提交</Button> </td>
            </tr>
          </tbody>
        </table>
      </Form>
    )
  }
}

ChangeMessageCom = Form.create({})(ChangeMessageCom);
export default ChangeMessageCom;
