/* global __CONFIG__ */

import styled, { keyframes } from 'styled-components'

const mainColor = __CONFIG__.cssVariables.mainColor

export const TimerBar = styled.div`
  border-radius: 4px;
  height: 4px;
  background-color: ${mainColor};
  transition-property: width;
  transition-timing-function: linear;
`

const wiggle = keyframes`
  from {
    transform: rotate(-2deg);
    -webkit-transform: rotate(-2deg);
  }

  to {
    transform: rotate(2deg);
    -webkit-transform: rotate(2deg);
  }
`

export const Animal = styled.img`
  margin: 0 auto;
  width : 200px;
  display: block;
  margin-bottom: 20px;
  animation-iteration-count: infinite;
  animation-name: ${wiggle};
  animation-duration: .5s;
  animation-direction: alternate;
  animation-timing-function: linear;
`
