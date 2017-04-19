import React from 'react'
import { connect } from 'react-redux'

import { createSelector } from 'reselect'

import {
  selectItem
} from 'containers/App/selectors'

import { StyledContainer, StyledImage, ScreenReaderImage, DigitalCollections } from './styles'

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
        <ScreenReaderImage src={src} alt={title} className='only-screen-reader' />
        <StyledImage style={imageStyle} />
        <DigitalCollections>
          <a target='_blank' href={`http://digitalcollections.nypl.org/items/${this.props.item.id}`}>
            View in high resolution in Digital Collections
          </a>
        </DigitalCollections>
      </StyledContainer>
    )
  }
}

export default connect(createSelector(
  selectItem(),
  (item) => ({
    item
  })
))(Image)
