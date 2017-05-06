import React from 'react'
import styled from 'styled-components'

export const StyledButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent ? props.justifyContent : 'center'};
  // width: 100%;
`

function Buttons (props) {
  return (
    <StyledButtons justifyContent={props.justifyContent}>
      {props.children}
    </StyledButtons>
  )
}

export default Buttons
