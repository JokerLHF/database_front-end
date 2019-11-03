import React, { Component, Fragment, } from 'react';
import ChangeMessage from './ChangeMessage';
import Commodity from './Commodity';
import Calculations from './CalculationsTable';
import CalculationUser from './CalculationsUser';
import CarbonPriceUser from './CarbonPriceUser';
import './index.less';
class FeatureFirst extends Component {

  render () {
    return (
      <Fragment>
        <ChangeMessage />
        <CarbonPriceUser markId="1" />
        <Commodity markId="2" />
        <CalculationUser markId="3" />
        <Calculations markId="4" />
      </Fragment>
    )
  }
}
export default FeatureFirst;