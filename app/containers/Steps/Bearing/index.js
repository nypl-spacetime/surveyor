import React from 'react'
import { connect } from 'react-redux'

import { createSelector } from 'reselect'

import Map from 'containers/Map'
import PaneButton from 'containers/PaneButton'

import Button from 'components/Button'
import Flex from 'components/Flex'

import { Container, BottomButtons, Buttons, MapContainer } from '../styles'

import {
  selectStepData
} from 'containers/App/selectors'

export class Step extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      initializedMap: false,
      hasMoved: false || this.props.savedStepData,
      initialData: {
        zoom: props.locationStepData.data.zoom,
        center: [
          props.locationStepData.data.geometry.coordinates[1],
          props.locationStepData.data.geometry.coordinates[0]
        ],
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
  }

  roundNumber (num) {
    return Math.round(num * 100) / 100
  }

  onCameraInput () {
    if (this.state.initializedMap && !this.state.hasMoved) {
      this.setState({
        hasMoved: true
      })
    }
  }

  onCameraChange () {
    this.saveData()
    this.onCameraInput()
  }

  onMoveEnd () {
    this.saveData()
  }

  saveData () {
    if (this.state.initializedMap) {
      this.props.save(this.getData())
    }
  }

  getData () {
    if (this.state.initializedMap) {
      const fieldOfView = this.map.getFieldOfView()
      const view = this.map.getView()

      return {
        angle: this.roundNumber(fieldOfView.properties.angle),
        bearing: this.roundNumber(fieldOfView.properties.bearing),
        distance: this.roundNumber(fieldOfView.properties.distance),
        geometry: fieldOfView.geometry,
        zoom: view.zoom,
        center: {
          type: 'Point',
          coordinates: view.center
        }
      }
    }
  }

  render () {
    let data
    if (this.props.savedStepData) {
      const center = this.props.savedStepData.center
      data = {
        center: [
          center.coordinates[1],
          center.coordinates[0]
        ],
        zoom: this.props.savedStepData.zoom,
        fieldOfView: {
          type: 'Feature',
          properties: {
            angle: this.props.savedStepData.angle
          },
          geometry: this.props.savedStepData.geometry.geometries[1]
        }
      }
    } else {
      data = this.state.initialData
    }

    const mapEvents = {
      moveend: this.onMoveEnd.bind(this)
    }

    return (
      <Container>
        <MapContainer>
          <Map ref='map' mode='camera' data={data} mapEvents={mapEvents}
            cameraChange={this.onCameraChange.bind(this)} cameraInput={this.onCameraInput.bind(this)} />
        </MapContainer>
        <BottomButtons>
          <Buttons>
            <Flex justifyContent='space-between'>
              <PaneButton index={0} />
              <Flex justifyContent='flex-end'>
                <Button onClick={this.props.skip} type='skip'>Skip</Button>
                <Button onClick={this.submit.bind(this)} type='submit' disabled={!this.state.hasMoved}>Submit</Button>
              </Flex>
            </Flex>
          </Buttons>
        </BottomButtons>
      </Container>
    )
  }

  componentDidMount () {
    this.map = this.refs.map.getWrappedInstance()

    if (!this.props.savedStepData) {
      const leafletMap = this.map.getMap()
      const mapContainer = leafletMap.getContainer()

      const fromCenter = 0.1

      const cameraPoint = [
        mapContainer.clientWidth * (0.5 + fromCenter),
        mapContainer.clientHeight * (0.5 + fromCenter)
      ]

      const targetPoint = [
        mapContainer.clientWidth * (0.5 - fromCenter),
        mapContainer.clientHeight * (0.5 - fromCenter)
      ]

      const cameraLatLng = leafletMap.containerPointToLatLng(cameraPoint)
      const targetLatLng = leafletMap.containerPointToLatLng(targetPoint)

      this.map.setCameraAndTargetLatLng(cameraLatLng, targetLatLng)
    }

    this.setState({
      initializedMap: true
    })
  }

  submit () {
    if (this.state.hasMoved) {
      this.props.submit(this.getData())
    }
  }
}

export default connect(createSelector(
  selectStepData('location'),
  (locationStepData) => ({
    locationStepData
  })
))(Step)
