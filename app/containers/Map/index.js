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
import targetImage from '../../../node_modules/leaflet-geotag-photo/images/target.svg'
import controlCameraImg from '../../../node_modules/leaflet-geotag-photo/images/camera-icon.svg'
import controlCrosshairImg from '../../../node_modules/leaflet-geotag-photo/images/crosshair-icon.svg'

export class Map extends React.Component {

  static defaultProps = {
    options: {}
  }

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

  getOptions (key) {
    return this.props.options[key] || this.props.defaults[key]
  }

  componentDidMount () {
    const node = findDOMNode(this.refs.map)

    const map = L.map(node, {
      center: this.getOptions('center'),
      zoom: this.getOptions('zoom'),
      maxZoom: this.getOptions('maxZoom'),
      scrollWheelZoom: this.getOptions('scrollWheelZoom'),
      doubleClickZoom: this.getOptions('doubleClickZoom')
    })

    map.attributionControl.setPrefix('')

    L.tileLayer(this.getOptions('tileUrl'), {
      attribution: this.getOptions('attribution')
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

      const targetIcon = L.icon({
        iconUrl: targetImage,
        iconSize: [180, 32],
        iconAnchor: [90, 16]
      })

      const camera = L.geotagPhoto.camera(this.props.fieldOfView, {
        cameraIcon,
        targetIcon,
        controlCameraImg,
        controlCrosshairImg
      }).addTo(map)

      this.camera = camera

      if (this.props.cameraChange) {
        camera.on('change', this.props.cameraChange)
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
