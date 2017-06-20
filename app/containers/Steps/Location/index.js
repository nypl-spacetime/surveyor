import React from 'react'

import Map from 'containers/Map'

import Button from 'components/Button'
import Flex from 'components/Flex'
import PaneButton from 'containers/PaneButton'

import { Container, BottomButtons, Buttons, MapContainer } from '../styles'

export class Step extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      initializedMap: false,
      hasMoved: false || this.props.savedStepData
    }
  }

  render () {
    const mapEvents = {
      movestart: this.onMoveStart.bind(this),
      moveend: this.onMoveEnd.bind(this)
    }

    let data
    if (this.props.savedStepData && this.props.savedStepData.geometry) {
      const coordinates = this.props.savedStepData.geometry.coordinates
      data = {
        center: [
          coordinates[1],
          coordinates[0]
        ],
        zoom: this.props.savedStepData.zoom
      }
    }

    return (
      <Container>
        <MapContainer>
          <Map ref='map' mapEvents={mapEvents} mode='crosshair' data={data} />
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
    this.setState({
      initializedMap: true
    })
  }

  getData () {
    if (this.state.initializedMap) {
      const view = this.map.getView()
      return {
        zoom: view.zoom,
        geometry: {
          type: 'Point',
          coordinates: view.center
        }
      }
    }
  }

  submit () {
    if (this.state.hasMoved) {
      this.props.submit(this.getData())
    }
  }

  onMoveStart () {
    if (!this.state.hasMoved) {
      this.setState({
        hasMoved: true
      })
    }
  }

  onMoveEnd () {
    if (this.state.initializedMap) {
      this.props.save(this.getData())
    }
  }
}

export default Step
