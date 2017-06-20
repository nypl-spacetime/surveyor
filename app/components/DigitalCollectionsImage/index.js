import React from 'react'

import styled from 'styled-components'

const Caption = styled.span`
  display: block;
  text-align: center;
`

const Title = styled.span`
  font-style: italic;
`

function DigitalCollectionsImage (props) {
  const url = `http://digitalcollections.nypl.org/items/${props.uuid}`
  const imageSrc = `http://images.nypl.org/index.php?id=${props.imageId}&t=w`
  const title = props.title

  return (
    <p>
      <a target='_blank' href={url}>
        <img src={imageSrc} alt={title} />
      </a>
      <Caption>
        <Title>{title}</Title>
      </Caption>
    </p>
  )
}

export default DigitalCollectionsImage
