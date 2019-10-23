import React, { Component, Fragment } from 'react';
import EnergySource from './EnergySource';
import Heat from './Heat';
class ZengWeb extends Component {
  render () {
    return (
      <Fragment>
        <EnergySource markId="1" />
        <Heat markId="2" />
      </Fragment>
    )
  }
}
export default ZengWeb;