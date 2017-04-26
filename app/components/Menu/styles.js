 /* global __CONFIG__ */

import styled from 'styled-components'
import { Link } from 'react-router'

const headerHeight = __CONFIG__.cssVariables.headerHeight
const headerColor = __CONFIG__.cssVariables.headerColor
const headerBackground = __CONFIG__.cssVariables.headerBackground
const mainColor = __CONFIG__.cssVariables.mainColor
const mobileWidth = __CONFIG__.cssVariables.mobileWidth
const hamburgerWidth = headerHeight

export const Hamburger = styled.div`
  font-size: calc(${hamburgerWidth} - 2 * 10px);
  text-align: center;
  padding: 10px;
  display: none;

  width: ${hamburgerWidth};
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

    & > a {

    }
  }
`

export const Nav = styled.nav`
  margin: 0 5px;
  display: flex;

  & a {
    color: ${headerColor};
  }

  & > * {
    display: inline-block;
    padding: 5px 12px 5px 12px;
    border-radius: 3px;
  }

  &:hover > * {
    border-radius: 0;
  }

  &:hover > *:first-child {
    border-radius: 3px 0 0 3px;
  }

  &:hover > *:last-child {
    border-radius: 0 3px 3px 0;
  }
`

export const StyledLink = styled(Link)`
  background-color: ${(props) => props.selected ? mainColor : 'none'};

  transition: background-color 0.2s;

  &:hover {
    background-color: ${mainColor};
  }
`
