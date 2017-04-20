/* global __CONFIG__ */

import styled from 'styled-components'

const padding = __CONFIG__.cssVariables.padding
const headerColor = __CONFIG__.cssVariables.headerColor

export const StyledContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  background-color: black;
  position: relative;
`

export const ImageContainer = styled.div`
  padding: ${padding};
  width: 100%;
  height: 100%;

  & div {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`

export const ScreenReaderImage = styled.img`
  width: 100px;
`

export const DigitalCollections = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: ${padding};

  & a {
    text-align: center;
    display: inline-block;
    box-sizing: border-box;
    border-radius: 2rem;
    padding: 0.5rem 1.3rem;
    background-color: rgba(0, 0, 0, 0.6);
    color: ${headerColor};
  }
`

