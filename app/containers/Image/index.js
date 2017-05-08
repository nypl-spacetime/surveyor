import React from 'react'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
import { createSelector } from 'reselect'

import {
  selectItem,
  selectPaneMode
} from 'containers/App/selectors'

import {
  setError,
  setPaneIndex,
  toggleMetadata
} from '../App/actions'

import Buttons from 'components/Buttons'
import Metadata from 'containers/Metadata'
import PaneButton from 'containers/PaneButton'

import { StyledContainer, LoadingImage, ImageContainer, ScreenReaderImage, TopBottom } from './styles'

export class Image extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      imageLoaded: false
    }
  }

  componentDidMount () {
    const imageNode = findDOMNode(this.refs.image)

    if (imageNode.complete) {
      this.imageLoaded()
    } else {
      imageNode.addEventListener('load', this.imageLoaded.bind(this))
      imageNode.addEventListener('error', this.imageError.bind(this))
    }
  }

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
      backgroundImage: `url(${src})`,
      opacity: this.state.imageLoaded ? 1 : 0
    }

    const loading = this.state.imageLoaded ? null : <div>Loading image…</div>

    return (
      <StyledContainer>
        <LoadingImage>
          {loading}
        </LoadingImage>
        <TopBottom onClick={this.onClick.bind(this)}>
          <Metadata />
          <Buttons justifyContent='flex-end'>
            <PaneButton index={1} />
          </Buttons>
        </TopBottom>
        <ScreenReaderImage ref='image' src={src} alt={title} className='only-screen-reader' />
        <ImageContainer onClick={this.onClick.bind(this)}>
          <div style={imageStyle} />
        </ImageContainer>
      </StyledContainer>
    )
  }

  imageError () {
    this.props.setError(new Error('Failed to load image'))
  }

  imageLoaded () {
    this.setState({
      imageLoaded: true
    })
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
    setError: (error) => dispatch(setError(error)),
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
