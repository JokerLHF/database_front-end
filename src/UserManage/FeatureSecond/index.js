import React, { Component, Fragment } from 'react';
import UserMessage from '../UserMessage';
import Month from './Month';
import Annually from './Annualy';
class FeatureSecond extends Component {
  render () {
    return (
      <Fragment>
        <UserMessage markId="1" />
        <Annually markId="2" />
        <Month markId="3" />
      </Fragment>
    )
  }
}
export default FeatureSecond;