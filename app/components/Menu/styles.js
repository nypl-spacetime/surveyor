 /* global __CONFIG__ */

import styled, { css } from 'styled-components'
import { Link } from 'react-router'

const headerHeight = __CONFIG__.cssVariables.headerHeight
const headerColor = __CONFIG__.cssVariables.headerColor
const padding = __CONFIG__.cssVariables.padding
const headerBackground = __CONFIG__.cssVariables.headerBackground
const mainColor = __CONFIG__.cssVariables.mainColor
const mobileWidth = __CONFIG__.cssVariables.mobileWidth
const hamburgerWidth = headerHeight
const borderRadius = '3px'

export const Hamburger = styled.div`
  font-size: calc(${hamburgerWidth} - 2 * 10px);
  text-align: center;
  padding: ${padding} 0;
  display: none;

  width: 1em;
  height: ${hamburgerWidth};

  @media (max-width: ${mobileWidth}) {
    display: block;
  }
`

export const Container = styled.div`
  display: flex;
  align-items: center;
`

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${mobileWidth}) {
    & > nav {
      display: none;

      position: absolute;
      right: 0;
      top: ${headerHeight};
      background-color: ${headerBackground};
      z-index: 9998;
      margin: 0;
      flex-direction: column;
    }
  }
`

export const Nav = styled.nav`
  display: flex;

  &:hover > * {
    border-radius: 0;
  }

  &:hover > *:first-child {
    border-radius: ${borderRadius} 0 0 ${borderRadius};
  }

  &:hover > *:last-child {
    border-radius: 0 ${borderRadius} ${borderRadius} 0;
  }
`

export const PaneNav = styled(Nav)`
  margin-right: ${padding};

  @media (max-width: ${mobileWidth}) {
    display: none;
  }
`

const MenuItem = css`
  display: inline-block;
  padding: 5px 12px 5px 12px;
  border-radius: ${borderRadius};
  background-color: ${(props) => props.selected ? mainColor : 'none'};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${mainColor};
  }

  & > img {
    width: 17px;
  }
`

export const StyledButton = styled.button`
  ${MenuItem}
`

export const StyledLink = styled(Link)`
  ${MenuItem}
  color: ${headerColor} !important;
`
