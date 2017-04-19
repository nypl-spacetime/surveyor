/* global __CONFIG__ */

import styled from 'styled-components'

const padding = __CONFIG__.cssVariables.padding
const headerColor = __CONFIG__.cssVariables.headerColor

export const StyledContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  background-color: black;
  padding: ${padding};
  position: relative;
`

export const StyledImage = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-grow: 1;
`

export const ScreenReaderImage = styled.img`
  width: 100px;
`

export const DigitalCollections = styled.div`

  position: absolute;
  margin: 0 auto;

  bottom: ${padding};

  & a {
    color: ${headerColor};
  }
`

