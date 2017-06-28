/* global __CONFIG__ */

import styled, { keyframes } from 'styled-components'

import Page from 'components/Page'

const colors = __CONFIG__.cssVariables.colors
const padding = __CONFIG__.cssVariables.padding
const mobileWidth = __CONFIG__.cssVariables.mobileWidth

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  & > * {
    width: 100%;
    height: 100%;
    position: absolute;
  }
`

export const BottomButtons = styled.div`
  padding: ${padding};
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 9999;
  pointer-events: none;
`

export const Buttons = styled.div`
  & button {
    margin-left: ${padding};
  }
`

export const Explanation = styled.img`
  height: 200px;
  flex-shrink: 2;
  max-width: 100%;

  @media (max-width: ${mobileWidth}) {
    height: 150px;
  }
`

export const TextStep = styled(Page)`
  height: 100%;
  max-width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  & p {
    max-width: 780px;
    margin: 0 auto;
  }

  & > {
    flex-shrink: 0;
  }
`

export const TimerBarContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: ${padding};
`

export const TimerBar = styled.div`
  height: 5px;
  background-color: ${colors.red};
  transition-property: width;
  transition-timing-function: linear;
`

const rotation = '2deg'
const wiggle = keyframes`
  from {
    transform: rotate(-${rotation});
  }

  to {
    transform: rotate(${rotation});
  }
`

export const Animal = styled.img`
  margin: 0 auto;
  width : 200px;
  display: block;
  margin-top: 2em;
  margin-bottom: 2em;
  animation-iteration-count: infinite;
  animation-name: ${wiggle};
  animation-duration: .5s;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
`
