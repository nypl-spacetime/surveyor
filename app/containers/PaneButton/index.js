import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import {
  selectPaneMode,
  selectItem
} from '../App/selectors'

import {
  setPaneIndex
} from '../App/actions'

import { Container, Button } from './styles'

export class PaneButton extends React.Component {

  render () {
    let buttonStyle
    if (this.props.index === 0) {
      if (this.props.item && this.props.item.data && this.props.item.data.image_urls) {
        const urls = this.props.item.data.image_urls

        const src = urls[0].url.replace(/t=\w/, 't=t')

        buttonStyle = {
          backgroundImage: `url(${src})`,
          left: 0
        }
      }
    } else if (this.props.index === 1) {
      const username = 'nypllabs'
      const styleId = 'cj2gmix25005o2rpapartqm07'
      const accessToken = 'pk.eyJ1IjoibnlwbGxhYnMiLCJhIjoiSFVmbFM0YyJ9.sl0CRaO71he1XMf_362FZQ'
      const center = [40.75319, -73.98224].reverse()
      const zoom = 13 - 2

      const src = `https://api.mapbox.com/styles/v1/${username}/${styleId}/static/${center.join(',')},${zoom}/150x100@2x?access_token=${accessToken}`

      buttonStyle = {
        backgroundImage: `url(${src})`,
        backgroundColor: 'white',
        right: 0
      }
    }

    return (
      <Container paneMode={this.props.paneMode}>
        <Button onClick={this.onClick.bind(this)} style={buttonStyle} />
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
  (paneMode, item) => ({
    paneMode, item
  })
), mapDispatchToProps)(PaneButton)
