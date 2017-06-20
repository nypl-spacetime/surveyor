/* global __CONFIG__ */

import React from 'react'
import styled from 'styled-components'

const colors = __CONFIG__.cssVariables.colors

const Container = styled.div`
  width: 100%;
  margin: 0 auto;

  // Digital Collections images are 760px wide + padding * 2
  max-width: 780px;
  padding: 10px;

  & h2 {
    border-bottom: solid 5px ${colors.red};
  }

  & p img {
    max-width: 780px;
    margin: 0 auto;
    display: block;
  }
`

function Page (props) {
  return (
    <Container {...props}>
      {props.children}
    </Container>
  )
}

export default Page
