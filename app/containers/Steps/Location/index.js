import React from 'react'

import Map from 'containers/Map'

import StepContainer from 'components/StepContainer'
import Button from 'components/Button'
import Buttons from 'components/Buttons'

import { MapContainer } from './styles'

export class Step extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      hasMoved: false
    }
  }

  render () {
    const mapEvents = {
      movestart: this.onMoveStart.bind(this)
    }

    return (
      <StepContainer>
        <MapContainer>
          <Map ref='map' defaults={this.props.defaults} mapEvents={mapEvents} mode='crosshair' />
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
      const view = this.refs.map.getWrappedInstance().getView()
      this.props.submit({
        zoom: view.zoom,
        geometry: {
          type: 'Point',
          coordinates: view.center
        }
      })
    }
  }

  onMoveStart () {
    if (!this.state.hasMoved) {
      this.setState({
        hasMoved: true
      })
    }
  }
}

export default Step
