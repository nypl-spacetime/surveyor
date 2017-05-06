import React from 'react'
import styled from 'styled-components'

const Container = styled.article`
  width: 100%;
  margin: 0 auto;

  // Digital Collections images are 760px wide + padding * 2
  max-width: 780px;
  padding: 10px;
`

function Article (props) {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

export default Article
