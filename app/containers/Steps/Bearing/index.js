import React from 'react'
import { connect } from 'react-redux'

import { createSelector } from 'reselect'

import Map from 'containers/Map'
import PaneButton from 'containers/PaneButton'

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

    this.state = {
      hasMoved: false,
      initialView: {
        zoom: props.locationStepData.data.zoom,
        center: [
          props.locationStepData.data.geometry.coordinates[1],
          props.locationStepData.data.geometry.coordinates[0]
        ]
      },
      fieldOfView: {
        type: 'Feature',
        properties: {
          angle: 40
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            props.locationStepData.data.geometry.coordinates,
            props.locationStepData.data.geometry.coordinates
          ]
        }
      }
    }
  }

  // onSliderInput (e) {
  //   this.setState({
  //     angle: parseInt(e.target.value)
  //   });
  //   this.updateFieldOfView()
  // }

  roundNumber (n) {
    return Math.round(n * 100) / 100
  }

  onCameraChange () {
    if (!this.state.hasMoved) {
      this.setState({
        hasMoved: true
      })
    }
  }

  render () {
    const options = this.state.initialView
    const fieldOfView = this.state.fieldOfView

    return (
      <StepContainer>
        <MapContainer>
          <Map ref='map' mode='camera' cameraChange={this.onCameraChange.bind(this)}
            defaults={this.props.defaults} options={options} fieldOfView={fieldOfView} />
        </MapContainer>
        <Buttons justifyContent='space-between'>
          <PaneButton index={0} />
          <Buttons justifyContent='flex-end'>
            <Button onClick={this.props.skip} type='secondary'>Skip</Button>
            <Button onClick={this.submit.bind(this)} type='primary' disabled={!this.state.hasMoved}>Submit</Button>
          </Buttons>
        </Buttons>
      </StepContainer>
    )
  }

  componentDidMount () {
    const mapComponent = this.refs.map.getWrappedInstance()
    const map = mapComponent.getMap()
    const mapContainer = map.getContainer()

    const fromCenter = 0.1

    const cameraPoint = [
      mapContainer.clientWidth * (0.5 + fromCenter),
      mapContainer.clientHeight * (0.5 + fromCenter)
    ]

    const targetPoint = [
      mapContainer.clientWidth * (0.5 - fromCenter),
      mapContainer.clientHeight * (0.5 - fromCenter)
    ]

    const cameraLatLng = map.containerPointToLatLng(cameraPoint)
    const targetLatLng = map.containerPointToLatLng(targetPoint)

    mapComponent.setCameraAndTargetLatLng(cameraLatLng, targetLatLng)
  }

  submit () {
    if (this.state.hasMoved) {
      const fieldOfView = this.refs.map.getWrappedInstance().getFieldOfView()
      const data = {
        angle: fieldOfView.properties.angle,
        bearing: this.roundNumber(fieldOfView.properties.bearing),
        distance: this.roundNumber(fieldOfView.properties.distance),
        geometry: fieldOfView.geometry
      }
      this.props.submit(data)
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
