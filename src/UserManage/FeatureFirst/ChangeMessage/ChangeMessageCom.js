import React, { Component } from 'react';
import { Form, InputNumber, Button, message, Input } from 'antd';
import { MySelect, MyCommoditySelect } from './SelectType';
import _fetch from '../../../Util/Fetch';
const FormItem = Form.Item;

class ChangeMessageCom extends Component {

  sumbit = () => {
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        return;
      }
      const { ajaxConfig: { url, type = 'post', ContentType = 'application/x-www-form-urlencoded' } } = this.props.tableForm;
      const options = {
        url,
        data: values,
        type,
        headers: { 'Content-Type': ContentType }
      }

      _fetch(options).then(res => {
        if (res.code === 200) {
          message.success('修改成功');
        }
      })

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
        return (<td key={name}> <FormItem>{getFieldDecorator(name, { initialValue: '' })(<InputNumber min={0} className="td-input" />)}</FormItem> </td>)
      } else {
        return (<td key={name}> <FormItem>{getFieldDecorator(name, { initialValue: '' })(<Input className="td-input" />)}</FormItem> </td>)
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
