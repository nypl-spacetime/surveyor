import React from 'react'

import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

function CenteredItemPage (props) {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

export default CenteredItemPage
