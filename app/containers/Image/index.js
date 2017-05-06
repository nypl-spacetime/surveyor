import React from 'react'
import { connect } from 'react-redux'

import { createSelector } from 'reselect'

import {
  selectItem,
  selectPaneMode
} from 'containers/App/selectors'

import {
  setPaneIndex,
  toggleMetadata
} from '../App/actions'

import Buttons from 'components/Buttons'
import Metadata from 'containers/Metadata'
import PaneButton from 'containers/PaneButton'

import { StyledContainer, ImageContainer, ScreenReaderImage, TopBottom } from './styles'

export class Image extends React.Component {
  render () {
    let src
    let title
    if (this.props.item && this.props.item.data && this.props.item.data.image_urls) {
      const urls = this.props.item.data.image_urls
      let index = 0
      if (urls.length === 2) {
        index = 1
      }

      src = this.props.item.data.image_urls[index].url
      title = this.props.item.data.title
    }

    const imageStyle = {
      backgroundImage: `url(${src})`
    }

    return (
      <StyledContainer>
        <TopBottom onClick={this.onClick.bind(this)}>
          <Metadata />
          <Buttons justifyContent='flex-end'>
            <PaneButton index={1} />
          </Buttons>
        </TopBottom>
        <ScreenReaderImage src={src} alt={title} className='only-screen-reader' />
        <ImageContainer onClick={this.onClick.bind(this)}>
          <div style={imageStyle} />
        </ImageContainer>
      </StyledContainer>
    )
  }

  toMapPane () {
    this.props.setPaneIndex(1)
  }

  onClick () {
    // this.props.toggleMetadata()
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setPaneIndex: (index) => dispatch(setPaneIndex(index)),
    toggleMetadata: () => dispatch(toggleMetadata())
  }
}

export default connect(createSelector(
  selectPaneMode(),
  selectItem(),
  (paneMode, item) => ({
    paneMode, item
  })
), mapDispatchToProps)(Image)
