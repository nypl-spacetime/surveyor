import React from 'react'
import { connect } from 'react-redux'

import { createSelector } from 'reselect'

import {
  selectItem,
  selectCurrentStep
} from 'containers/App/selectors'

import { Container, Title } from './styles'

export class Metadata extends React.Component {

  render () {
    const collection = (this.props.item && this.props.item.collection) || {}
    const itemData = (this.props.item && this.props.item.data) || {}

    var collectionLink
    if (collection.url) {
      const title = collection.title || 'Digital Collections'
      collectionLink = (
        <a target='_blank' href={collection.url}>{title}</a>
      )
    }

    let geoDateHeader
    if (itemData.location || itemData.date) {
      let fields = []

      if (itemData.location) {
        fields.push({
          key: 'Location',
          value: itemData.location
        })
      }

      if (itemData.date) {
        fields.push({
          key: 'Date',
          value: itemData.date
        })
      }

      geoDateHeader = (
        <div>
          {fields.map((field, index) => (
            <div key={index}>
              {field.key}: {field.value}
            </div>
          ))}
        </div>
      )
    }

    const titleLength = itemData.title ? itemData.title.length : 0

    let titleStyle
    if (titleLength > 100) {
      titleStyle = {
        fontSize: `1.6em`
      }
    } else if (titleLength > 50) {
      titleStyle = {
        fontSize: `1.8em`
      }
    }

    let metadata
    if (this.props.currentStep === 'location' || this.props.currentStep === 'bearing') {
      metadata = (
        <div>
          <div>Collection: {collectionLink}</div>
          {geoDateHeader}
        </div>
      )
    }

    return (
      <Container>
        <Title style={titleStyle} title={itemData.title}>{itemData.title}</Title>
        {metadata}
      </Container>
    )
  }
}

export default connect(createSelector(
  selectItem(),
  selectCurrentStep(),
  (item, currentStep) => ({
    item, currentStep
  })
))(Metadata)
