import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import {
  selectPaneMode,
  selectItem,
  selectMapDefaults
} from '../App/selectors'

import {
  setPaneIndex
} from '../App/actions'

import crosshairHereSmall from 'images/crosshair-here-small.svg'

import { Container, Button, Crosshair } from './styles'

export class PaneButton extends React.Component {

  render () {
    let buttonStyle
    let src
    let overlay
    let label
    if (this.props.index === 0) {
      if (this.props.item && this.props.item.data && this.props.item.data.image_urls) {
        const urls = this.props.item.data.image_urls

        src = urls[0].url.replace(/t=\w/, 't=t')

        buttonStyle = {
          backgroundImage: `url(${src})`,
          left: 0
        }
      }

      label = 'Go to image'
    } else if (this.props.index === 1) {
      const mapbox = this.props.mapDefaults.mapbox
      let center = this.props.mapDefaults.center
      let zoom = this.props.mapDefaults.zoom

      src = `https://api.mapbox.com/styles/v1/${mapbox.username}/${mapbox.styleId}/static/${[center[1], center[0]].join(',')},${zoom - 4}/150x100@2x?access_token=${mapbox.accessToken}`

      buttonStyle = {
        backgroundImage: `url(${src})`,
        right: 0
      }

      overlay = (
        <Crosshair role='presentation' src={crosshairHereSmall} />
      )

      label = 'Go to map'
    }

    return (
      <Container paneMode={this.props.paneMode}>
        <Button onClick={this.onClick.bind(this)} style={buttonStyle} aria-label={label}>
          {overlay}
        </Button>
      </Container>
    )
  }

  onClick () {
    this.props.setPaneIndex(this.props.index)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setPaneIndex: (index) => {
      dispatch(setPaneIndex(index))
    },
    dispatch
  }
}

export default connect(createSelector(
  selectPaneMode(),
  selectItem(),
  selectMapDefaults(),
  (paneMode, item, mapDefaults) => ({
    paneMode, item, mapDefaults
  })
), mapDispatchToProps)(PaneButton)
