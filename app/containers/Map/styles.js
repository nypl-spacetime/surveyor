/* global __CONFIG__ */

import styled from 'styled-components'

const outlineColor = __CONFIG__.cssVariables.outlineColor
const outlineOpacity = __CONFIG__.cssVariables.outlineOpacity
const outlineWidth = __CONFIG__.cssVariables.outlineWidth

export const StyledContainer = styled.div`
  position: relative;
`

export const StyledMap = styled.div`
  height: 100%;
  width: 100%;
  flex-grow: 1;

  & .map-focus {
    position: absolute;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    pointer-events: none;
    visibility: hidden;

    opacity: ${outlineOpacity};
    border-style: solid;
    border-color: ${outlineColor};
    border-width: ${outlineWidth};
    z-index: 999;
  }

  &:focus .map-focus {
    visibility: visible;
  }
`
