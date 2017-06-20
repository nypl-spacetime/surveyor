import React from 'react'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'

import L from 'leaflet'
require('leaflet-geotag-photo')

import { createSelector } from 'reselect'

import {
  selectMapDefaults
} from 'containers/App/selectors'

import { StyledContainer, StyledMap } from './styles'

import crosshairHereImage from 'images/crosshair-here.svg'
import crosshairShadowImage from 'images/crosshair-shadow.svg'

import cameraImage from '../../../node_modules/leaflet-geotag-photo/images/camera.svg'
import markerImage from '../../../node_modules/leaflet-geotag-photo/images/marker.svg'

export class Map extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      dimensions: {
        width: 0,
        height: 0
      }
    }
  }

  render () {
    return (
      <StyledContainer ref='container'>
        <StyledMap ref='map' />
      </StyledContainer>
    )
  }

  roundCoordinate (coordinate) {
    return Math.round(coordinate * 1000000) / 1000000
  }

  getView () {
    if (this.map) {
      const center = this.map.getCenter()
      return {
        center: [
          center.lng,
          center.lat
        ].map(this.roundCoordinate),
        zoom: this.map.getZoom()
      }
    }
  }

  getFieldOfView () {
    if (this.camera) {
      return this.camera.getFieldOfView()
    }
  }

  setCameraAndTargetLatLng (cameraLatLng, targetLatLng) {
    if (this.camera) {
      this.camera.setCameraAndTargetLatLng(cameraLatLng, targetLatLng)
    }
  }

  setAngle (angle) {
    if (this.camera) {
      this.camera.setAngle(angle)
    }
  }

  getMap () {
    return this.map
  }

  componentDidMount () {
    const node = findDOMNode(this.refs.map)

    const focusDiv = document.createElement('div')
    focusDiv.className = 'map-focus'
    node.appendChild(focusDiv)

    const center = (this.props.data && this.props.data.center) || this.props.defaults.center
    const zoom = (this.props.data && this.props.data.zoom) || this.props.defaults.zoom

    const map = L.map(node, {
      center,
      zoom,
      minZoom: this.props.defaults.minZoom,
      maxZoom: this.props.defaults.maxZoom,
      scrollWheelZoom: this.props.defaults.scrollWheelZoom,
      doubleClickZoom: this.props.defaults.doubleClickZoom,
      keyboardPanDelta: this.props.defaults.keyboardPanDelta
    })

    map.attributionControl.setPosition('topright')
    map.attributionControl.setPrefix('')

    L.tileLayer(this.props.defaults.tileUrl, {
      attribution: this.props.defaults.attribution
    }).addTo(map)

    if (this.props.mode === 'crosshair') {
      const imgShadow = `<img src="${crosshairShadowImage}" role="none" class="crosshair-shadow" />`
      const imgHere = `<img src="${crosshairHereImage}" alt="Location where photo was taken" class="crosshair-here" />`

      this.crosshair = L.geotagPhoto.crosshair({
        crosshairHTML: `<div class="crosshair">${imgShadow}${imgHere}</div>`
      }).addTo(map)
    } else if (this.props.mode === 'camera') {
      const cameraIcon = L.icon({
        iconUrl: cameraImage,
        iconSize: [38, 38],
        iconAnchor: [19, 19]
      })

      const markerIcon = L.icon({
        iconUrl: markerImage,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })

      const fieldOfView = this.props.data && this.props.data.fieldOfView
      const camera = L.geotagPhoto.camera(fieldOfView, {
        cameraIcon,
        targetIcon: markerIcon,
        angleIcon: markerIcon,
        control: false
      }).addTo(map)

      this.camera = camera

      if (this.props.cameraChange) {
        camera.on('change', this.props.cameraChange)
      }

      if (this.props.cameraInput) {
        camera.on('input', this.props.cameraInput)
      }
    }

    if (this.props.mapEvents) {
      Object.keys(this.props.mapEvents)
        .forEach((event) => map.on(event, this.props.mapEvents[event]))
    }

    if (this.props.mapCreated) {
      this.props.mapCreated(map)
    }

    this.map = map

    setInterval(() => this.checkSize(), 500)
  }

  checkSize () {
    const node = findDOMNode(this.refs.container)
    if (node) {
      const dimensions = { width: node.clientWidth, height: node.clientHeight }
      if (this.state.dimensions.width !== dimensions.width || this.state.dimensions.height !== dimensions.height) {
        this.map.invalidateSize()
        this.setState({
          dimensions
        })
      }
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(createSelector(
  selectMapDefaults(),
  (defaults) => ({
    defaults
  })
), mapDispatchToProps, null, { withRef: true })(Map)
