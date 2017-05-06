/* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth
const padding = __CONFIG__.cssVariables.padding
const imageBackground = __CONFIG__.cssVariables.imageBackground

export const StyledContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  background-color: ${imageBackground};
  position: relative;
`

export const ImageContainer = styled.div`
  padding: calc(2 * ${padding});
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

export const TopBottom = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ButtonContainer = styled.div`
  display: ${(props) => props.paneMode === 'single' ? 'flex' : 'none'};
  justify-content: flex-end;

  @media (max-width: ${mobileWidth}) {
    display: flex;
  }
`

export const ScreenReaderImage = styled.img`
  width: 100px;
`
