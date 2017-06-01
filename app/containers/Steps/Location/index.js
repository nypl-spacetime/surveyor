import React from 'react'

import Map from 'containers/Map'

import Button from 'components/Button'
import Flex from 'components/Flex'
import PaneButton from 'containers/PaneButton'

import { Container, ButtonContainer, MapContainer } from '../styles'

export class Step extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      hasMoved: false
    }
  }

  render () {
    const mapEvents = {
      movestart: this.onMoveStart.bind(this),
      moveend: this.onMoveEnd.bind(this)
    }

    return (
      <Container>
        <MapContainer>
          <Map ref='map' defaults={this.props.defaults} mapEvents={mapEvents} mode='crosshair' />
        </MapContainer>
        <ButtonContainer>
          <Flex justifyContent='space-between'>
            <PaneButton index={0} />
            <Flex justifyContent='flex-end'>
              <Button onClick={this.props.skip} type='skip'>Skip</Button>
              <Button onClick={this.submit.bind(this)} type='submit' disabled={!this.state.hasMoved}>Submit</Button>
            </Flex>
          </Flex>
        </ButtonContainer>
      </Container>
    )
  }

  getData () {
    const view = this.refs.map.getWrappedInstance().getView()
    return {
      zoom: view.zoom,
      geometry: {
        type: 'Point',
        coordinates: view.center
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
    console.log('store map center as intermediary step data')
    // this.props.storeIntermediary(this.getData())
    // if (!this.state.hasMoved) {
    //   this.setState({
    //     hasMoved: true
    //   })
    // }
  }
}

export default Step
