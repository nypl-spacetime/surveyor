import React, { PropTypes } from 'react'

import { Container } from './styles'

function StepContainer (props) {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

StepContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default StepContainer
