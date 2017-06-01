/* global __CONFIG__ */

import styled, { keyframes } from 'styled-components'

import Page from 'components/Page'

const mainColor = __CONFIG__.cssVariables.mainColor
const padding = __CONFIG__.cssVariables.padding

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

export const ButtonContainer = styled.div`
  padding: calc(${padding} / 2);
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 9999;
  pointer-events: none;
`

export const Explanation = styled.img`
  margin: 0 auto;
  display: block;
  height: 200px;
  flex-shrink: 2;
  max-width: 100%;
`

export const TextStep = styled(Page)`
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
  background-color: ${mainColor};
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
  margin-bottom: 20px;
  animation-iteration-count: infinite;
  animation-name: ${wiggle};
  animation-duration: .5s;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
`
