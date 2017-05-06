import React from 'react'
import { connect } from 'react-redux'

import { createSelector } from 'reselect'

import {
  selectItem,
  selectCurrentStep,
  selectShowMetadata
} from 'containers/App/selectors'

import { Container, MetadataToggle, MetadataContainer, Title, Field } from './styles'

import iconLocation from 'images/icon-location.svg'
import iconDate from 'images/icon-date.svg'

export class Metadata extends React.Component {

  render () {
    const show = this.props.showMetadata

    const itemData = (this.props.item && this.props.item.data) || {}

    // const titleLength = itemData.title ? itemData.title.length : 0

    let titleStyle
    // if (titleLength > 100) {
    //   titleStyle = {
    //     fontSize: `1.6em`
    //   }
    // } else if (titleLength > 50) {
    //   titleStyle = {
    //     fontSize: `1.8em`
    //   }
    // }

    // let metadata = (
    //     <div>
    //       <div>Collection: {collectionLink}</div>
    //       {geoDateHeader}
    //     </div>
    //   )

    let metadata = [
      <Title style={titleStyle} title={itemData.title}>{itemData.title}</Title>,
      <div>
        View in high resolution
        in <a target='_blank' href={`http://digitalcollections.nypl.org/items/${this.props.item.id}`}>
          Digital Collections
        </a>
      </div>
    ]

    if (itemData.location) {
      metadata.push(
        <Field><img title='Location' alt='Location of this item' src={iconLocation} /> {itemData.location}</Field>
      )
    }

    if (itemData.date) {
      metadata.push(
        <Field><img title='Date' alt='Date or year of this item' src={iconDate} /> {itemData.date}</Field>
      )
    }

    return (
      <Container>
        <MetadataToggle show={!show}>
          Click to show title & metadata
        </MetadataToggle>
        <MetadataContainer show={show}>
          {metadata.map((item, index) => <div key={index}>{item}</div>)}
        </MetadataContainer>
      </Container>
    )
  }
}

export default connect(createSelector(
  selectItem(),
  selectCurrentStep(),
  selectShowMetadata(),
  (item, currentStep, showMetadata) => ({
    item, currentStep, showMetadata
  })
))(Metadata)
