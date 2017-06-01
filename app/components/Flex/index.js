import React from 'react'
import styled from 'styled-components'

export const FlexContainer = styled.div`
  display: flex;
  flex-shrink: 0;

  flex-direction:  ${(props) => props.direction || 'row'};
  justify-content: ${(props) => props.justifyContent ? props.justifyContent : 'center'};
  width: ${(props) => props.fill ? '100%' : 'auto'};
  height: ${(props) => props.fill ? '100%' : 'auto'};
  position: ${(props) => props.fill ? 'absolute' : 'auto'};
  pointer-events: none;

  & > * {
    pointer-events: all;
  }
`

function Flex (props) {
  return (
    <FlexContainer justifyContent={props.justifyContent} direction={props.direction}
      fill={props.fill}>
      {props.children}
    </FlexContainer>
  )
}

export default Flex
