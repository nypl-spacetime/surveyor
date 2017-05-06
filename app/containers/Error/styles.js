import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  width: 250px;
`

export const ErrorMessage = styled.div`
  text-align: center;
`

export const Centered = styled.div`
  text-align: center;
`

export const Lion = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;

  & > * {
    position: absolute;
  }
`

const evilEye = keyframes`
  0% {
    opacity: 0;
  }

  70% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

export const Eye = styled.img`
  opacity: 0;
  animation-iteration-count: infinite;
  animation-name: ${evilEye};
  animation-duration: .9s;
  animation-direction: normal;
  animation-timing-function: linear;
`
