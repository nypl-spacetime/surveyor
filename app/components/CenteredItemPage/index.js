/* global __CONFIG__ */

import React from 'react'

import styled from 'styled-components'

const headerColor = __CONFIG__.cssVariables.headerColor
const imageBackground = __CONFIG__.cssVariables.imageBackground

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${imageBackground};
  color: ${headerColor};
`

function CenteredItemPage (props) {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

export default CenteredItemPage
