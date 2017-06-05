import React from 'react'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
import { createSelector } from 'reselect'

import {
  selectItem,
  selectPaneMode,
  selectCurrentStepIndex
} from 'containers/App/selectors'

import {
  loadItem,
  setError,
  setPaneIndex,
  toggleMetadata
} from '../App/actions'

import Button from 'components/Button'
import Flex from 'components/Flex'
import Metadata from 'containers/Metadata'
import PaneButton from 'containers/PaneButton'

import { StyledContainer, LoadingImage, ImageContainer, NewImageContainer, ScreenReaderImage } from './styles'

export class Image extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      imageLoaded: false
    }
  }

  componentDidMount () {
    this.addImageLoadingEvents()
  }

  addImageLoadingEvents () {
    const imageNode = findDOMNode(this.refs.image)

    if (imageNode.complete) {
      this.imageLoaded()
    } else {
      imageNode.addEventListener('load', this.imageLoaded.bind(this))
      imageNode.addEventListener('error', this.imageError.bind(this))
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.item.id !== prevProps.item.id) {
      this.addImageLoadingEvents()
      this.setState({
        imageLoaded: false
      })
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

    let newImageButton
    if (this.props.currentStepIndex === 0) {
      newImageButton = <Button onClick={this.loadNewImage.bind(this)} type='new'>New</Button>
    }

    return (
      <StyledContainer>
        <LoadingImage>
          {loading}
        </LoadingImage>
        <ScreenReaderImage ref='image' src={src} alt={title} className='only-screen-reader' />
        <ImageContainer onClick={this.onClick.bind(this)}>
          <div style={imageStyle} />
        </ImageContainer>
        <Flex direction='column' justifyContent='space-between' fill>
          <Metadata />
          <Flex justifyContent='space-between'>
            <NewImageContainer>
              {newImageButton}
            </NewImageContainer>
            <PaneButton index={1} />
          </Flex>
        </Flex>
      </StyledContainer>
    )
  }

  imageError () {
    // this.props.setError(new Error('Failed to load image'))
  }

  loadNewImage () {
    this.props.loadItem()
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
    this.props.toggleMetadata()
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadItem: () => dispatch(loadItem()),
    setError: (error) => dispatch(setError(error)),
    setPaneIndex: (index) => dispatch(setPaneIndex(index)),
    toggleMetadata: () => dispatch(toggleMetadata())
  }
}

export default connect(createSelector(
  selectPaneMode(),
  selectItem(),
  selectCurrentStepIndex(),
  (paneMode, item, currentStepIndex) => ({
    paneMode, item, currentStepIndex
  })
), mapDispatchToProps)(Image)
