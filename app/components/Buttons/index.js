import React, { PropTypes } from 'react'
import styled from 'styled-components'

export const StyledButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  flex-shrink: 0;
`

function Buttons (props) {
  return (
    <StyledButtons>
      {props.children}
    </StyledButtons>
  )
}

Buttons.propTypes = {
  children: PropTypes.node.isRequired
}

export default Buttons
