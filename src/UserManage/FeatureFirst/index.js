import React, { Component, Fragment, } from 'react';
import UserMessage from '../UserMessage';
import ChangeMessage from './ChangeMessage';
import Commodity from './Commodity';
import Calculations from './CalculationsTable';
import './index.less';
class FeatureFirst extends Component {

  render () {
    return (
      <Fragment>
        <ChangeMessage />
        <UserMessage />
        <Commodity />
        <Calculations />
      </Fragment>
    )
  }
}
export default FeatureFirst;