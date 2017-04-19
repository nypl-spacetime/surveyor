import React from 'react'
import { connect } from 'react-redux'

import { createSelector } from 'reselect'

import Map from 'containers/Map'

import StepContainer from 'components/StepContainer'
import Button from 'components/Button'
import Buttons from 'components/Buttons'

import { MapContainer } from './styles'

import {
  selectMapDefaults,
  selectStepData
} from 'containers/App/selectors'

export class Step extends React.Component {

  constructor (props) {
    super(props)
    const zoom = Math.min(props.locationStepData.data.zoom + 2, props.mapDefaults.maxZoom)
    this.state = {
      hasMoved: false,
      angle: 40,
      initialView: {
        zoom: zoom,
        center: [
          props.locationStepData.data.geometry.coordinates[1],
          props.locationStepData.data.geometry.coordinates[0]
        ]
      }
    }
  }

  // mapMoving = false
  // mapMovingLatLng = null

  // onSliderInput (e) {
  //   this.setState({
  //     angle: parseInt(e.target.value)
  //   });

  //   this.updateFieldOfView()
  // }

  onCameraChange () {
    console.log('vissen')
    if (!this.state.hasMoved) {
      this.setState({
        hasMoved: true
      })
    }
  }

  render () {
    const options = this.state.initialView

    return (
      <StepContainer>
        <MapContainer>
          <Map ref='map' mode='camera' cameraChange={this.onCameraChange.bind(this)}
            options={options} defaults={this.props.defaults} />
        </MapContainer>
        <Buttons>
          <Button onClick={this.props.skip} type='secondary'>Skip</Button>
          <Button onClick={this.submit.bind(this)} type='primary' disabled={!this.state.hasMoved}>Submit</Button>
        </Buttons>
      </StepContainer>
    )
  }

  submit () {
    if (this.state.hasMoved) {
      console.log('grijp fov!')
    //   var data = {
    //     angle: this.fieldOfView.properties.angle,
    //     bearing: this.roundNumber(this.fieldOfView.properties.bearing),
    //     distance: this.roundNumber(this.fieldOfView.properties.distance),
    //     geometry: this.fieldOfView.geometry
    //   }
    //   this.props.submit(data);
    }
  }
}

export default connect(createSelector(
  selectMapDefaults(),
  selectStepData('location'),
  (mapDefaults, locationStepData) => ({
    mapDefaults, locationStepData
  })
))(Step)
