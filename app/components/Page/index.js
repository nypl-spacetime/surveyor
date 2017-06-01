/* global __CONFIG__ */

import React from 'react'
import styled from 'styled-components'

const mainColor = __CONFIG__.cssVariables.mainColor

const Container = styled.div`
  width: 100%;
  margin: 0 auto;

  // Digital Collections images are 760px wide + padding * 2
  max-width: 780px;
  padding: 10px;

  & h2 {
    border-bottom: solid 5px ${mainColor};
  }

  & p img {
    width: 100%;
    max-width: 780px;
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
