/* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth
const padding = __CONFIG__.cssVariables.padding
const imageBackground = __CONFIG__.cssVariables.imageBackground
const headerColor = __CONFIG__.cssVariables.headerColor

export const StyledContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  background-color: ${imageBackground};
  position: relative;
`

export const ImageContainer = styled.div`
  position: absolute;
  padding: calc(2 * ${padding});
  width: 100%;
  height: 100%;

  & div {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    opacity: 0;
    transition: opacity 0.25s ease-in-out;
  }
`

export const LoadingImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  font-size: 75%;

  justify-content: center;
  align-items: center;

  color: ${headerColor};
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

export const NewImageContainer = styled.div`
  padding: ${padding};
`
