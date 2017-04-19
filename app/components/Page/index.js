/* global __CONFIG__ */

import React from 'react'
import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth
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

  & h3 {
    // border-bottom: solid 2px ${mainColor};
  }

  @media (min-width: ${mobileWidth}) {
    // & p,
    // & table,
    // & h3, & h4 {
    //   width: 66.666%;
    //   margin-left: 33.333%
    // }
  }

  & p img {
    width: 100%;
    max-width: 780px;
  }
`

function Page (props) {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

export default Page
