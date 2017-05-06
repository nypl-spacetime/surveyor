/* global __CONFIG__ */

import styled, { css } from 'styled-components'
import { Link } from 'react-router'

const padding = __CONFIG__.cssVariables.padding
const mainColor = __CONFIG__.cssVariables.mainColor
const pageBackground = __CONFIG__.cssVariables.pageBackground
const disabledBackground = __CONFIG__.cssVariables.disabledBackground
const mobileWidth = __CONFIG__.cssVariables.mobileWidth

const colors = {
  primary: pageBackground,
  secondary: mainColor,
  disabled: 'white'
}

const backgroundColors = {
  primary: mainColor,
  secondary: pageBackground,
  disabled: disabledBackground
}

const chunk = css`
  cursor: ${(props) => props.type !== 'disabled' ? 'pointer' : 'inherit'};
  box-sizing: border-box;
  border-radius: 2rem;
  flex-shrink: 0;
  display: inline-block;
  margin: ${padding};
  padding: 0.5rem 1.3rem;

  // text-transform: uppercase;
  text-decoration: none;

  transition: background-color .4s;
  color: ${(props) => colors[props.type]} !important;
  background-color: ${(props) => backgroundColors[props.type]};

  border-width: 2px;
  border-style: solid;
  border-color: ${pageBackground};
  transition: border-color 0.3s;

  &:active {
    border-color: rgba(255, 255, 255, 1);
  }

  &:hover {
    border-color: ${(props) => props.type !== 'disabled' ? mainColor : pageBackground};
  }

  @media (max-width: ${mobileWidth}) {
    // font-size: 90%;
    // margin: 0.3rem;
    padding: 0.4rem 0.8rem;
  }
`

export const StyledButton = styled.button`
  ${chunk}
`

export const StyledLink = styled(Link)`
  ${chunk}
`
